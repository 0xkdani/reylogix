# Mide el rendimiento con Lighthouse contra el BUILD, no contra el dev server.
#
# Medir "npm run dev" no sirve para nada: Vite sirve cada modulo por separado,
# sin minificar ni empaquetar, y los compila bajo demanda en la primera visita.
# Eso dispara el LCP a ~20 s y hunde la nota a 30-55 por muy optimizado que
# este el codigo. El mismo commit servido desde dist/ da 99 en movil.
#
#   .\scripts\lighthouse.ps1                      # movil (el perfil de PageSpeed)
#   .\scripts\lighthouse.ps1 -FormFactor desktop
#   .\scripts\lighthouse.ps1 -SkipBuild           # reutiliza el dist/ actual
#   .\scripts\lighthouse.ps1 -Route /blackline    # una ruta que no sea la portada
#
# Medir solo "/" deja fuera casi todo el peso del sitio: las rutas van en chunks
# aparte y cada una carga sus propias imagenes, asi que el corredor de /blackline
# no aparece en la nota de la portada.

param(
  [int]$Port = 4173,
  [ValidateSet('mobile', 'desktop')]
  [string]$FormFactor = 'mobile',
  [string]$Route = '/',
  [switch]$SkipBuild,
  [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$outDir = Join-Path $root '.lighthouse'

if (-not $SkipBuild) {
  Write-Host 'Compilando el build de produccion...' -ForegroundColor Cyan
  Push-Location $root
  try {
    npm run build | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'El build fallo. No hay nada que medir.' }
  } finally {
    Pop-Location
  }
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Write-Host "Levantando el preview en el puerto $Port..." -ForegroundColor Cyan
$server = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList "/c npx vite preview --port $Port --strictPort" `
  -WorkingDirectory $root -WindowStyle Hidden -PassThru

try {
  # El preview tarda un momento en atarse al puerto. Sondeamos hasta 30 s.
  $ready = $false
  foreach ($i in 1..60) {
    Start-Sleep -Milliseconds 500
    try {
      Invoke-WebRequest -Uri "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 2 | Out-Null
      $ready = $true
      break
    } catch { }
  }
  if (-not $ready) {
    throw "El preview no respondio en http://localhost:$Port/ (ocupado por otro proceso?)."
  }

  # El nombre del reporte lleva la ruta, para que medir /blackline no pise la
  # medicion de la portada.
  $slug = ($Route.Trim('/') -replace '[^a-zA-Z0-9]', '-')
  $report = Join-Path $outDir ("lh-$FormFactor" + $(if ($slug) { "-$slug" } else { '' }))

  $lhArgs = @(
    '--yes', 'lighthouse', ("http://localhost:$Port" + '/' + $Route.TrimStart('/')),
    '--only-categories=performance',
    '--output=json', '--output=html',
    "--output-path=$report",
    '--chrome-flags=--headless=new --no-sandbox',
    '--quiet'
  )
  # El preset de escritorio ya trae su propio emulado de pantalla y throttling.
  if ($FormFactor -eq 'desktop') { $lhArgs += '--preset=desktop' }

  Write-Host "Ejecutando Lighthouse ($FormFactor)..." -ForegroundColor Cyan
  npx @lhArgs
  if ($LASTEXITCODE -ne 0) { throw 'Lighthouse fallo.' }
} finally {
  # Start-Process lanza cmd.exe, que a su vez lanza node: hay que matar el arbol.
  if ($server -and -not $server.HasExited) {
    taskkill /PID $server.Id /T /F 2>&1 | Out-Null
  }
}

$json = Get-Content "$report.report.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$score = [math]::Round($json.categories.performance.score * 100)
$color = if ($score -ge 90) { 'Green' } elseif ($score -ge 50) { 'Yellow' } else { 'Red' }

Write-Host ''
Write-Host "  RENDIMIENTO ($FormFactor): $score / 100" -ForegroundColor $color
Write-Host ''
foreach ($id in @('first-contentful-paint', 'largest-contentful-paint',
                  'total-blocking-time', 'cumulative-layout-shift', 'speed-index')) {
  $audit = $json.audits.$id
  Write-Host ('  {0,-28} {1,10}' -f $audit.title, $audit.displayValue)
}

# Oportunidades que Lighthouse cree que valen la pena, con su ahorro estimado.
$opps = $json.categories.performance.auditRefs |
  ForEach-Object { $json.audits.($_.id) } |
  Where-Object { $_.details.type -eq 'opportunity' -and $_.score -ne $null -and $_.score -lt 0.95 }

if ($opps) {
  Write-Host ''
  Write-Host '  Oportunidades:' -ForegroundColor Yellow
  foreach ($o in $opps) { Write-Host ('    - {0}: {1}' -f $o.title, $o.displayValue) }
}

Write-Host ''
Write-Host "  Reporte: $report.report.html"
if (-not $NoOpen) { Start-Process "$report.report.html" }
