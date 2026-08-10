# Descarga a public/img las imagenes de sites.google.com/view/reylogix que usa
# la landing. Los nombres de salida coinciden con los de src/images.ts.
#
# Las URLs de Google Sites son tokens opacos que caducan, asi que se extraen del
# HTML crudo en cada corrida. Google responde 403 ante rafagas, por eso el script
# va despacio y reintenta con espera creciente. Es idempotente: lo ya descargado
# se salta, asi que se puede reejecutar hasta completar.
#
# Uso:  powershell -ExecutionPolicy Bypass -File scripts\fetch-images.ps1

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
$headers = @{
  'User-Agent' = $ua
  'Referer'    = 'https://sites.google.com/view/reylogix'
  'Accept'     = 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
}

# Posicion de la imagen en el HTML (1-based, URLs unicas) -> nombre de archivo.
# El orden se derivo del texto que rodea cada <img> en la pagina fuente.
# Nota: los indices =w16383 resultaron ser un GIF decorativo repetido, no
# imagenes distintas. Solo se descargan los =w1280, que son el contenido real.
$wanted = @{
  8  = 'servicio-costos'
  9  = 'servicio-aduanal'
  10 = 'servicio-diagnostico'
  11 = 'servicio-procesos'
  14 = 'enfoque-collage'
  16 = 'blackline-wordmark'
  19 = 'blackline-evaluacion'
  25 = 'caso-rodrigo'
  27 = 'caso-julian'
  28 = 'caso-jhonatan'
  29 = 'caso-valentina'
}

Write-Output 'Leyendo HTML de sites.google.com/view/reylogix ...'
$html = (Invoke-WebRequest -Uri 'https://sites.google.com/view/reylogix' -UseBasicParsing -TimeoutSec 60 -Headers @{ 'User-Agent' = $ua }).Content

$out = Join-Path $PSScriptRoot '..\public\img'
New-Item -ItemType Directory -Force -Path $out | Out-Null

$found = [regex]::Matches($html, 'https://lh[0-9]\.googleusercontent\.com/[A-Za-z0-9_\-/=.]+')
$seen = @{}
$i = 0
$ok = 0
$fail = 0
$pending = @()

foreach ($m in $found) {
  $url = $m.Value
  if ($seen.ContainsKey($url)) { continue }
  $seen[$url] = $true
  $i++

  if (-not $wanted.ContainsKey($i)) { continue }
  $name = $wanted[$i]

  # Siempre .jpg: el navegador detecta el formato real por contenido, y asi
  # src/images.ts puede asumir una sola extension.
  $path = Join-Path $out "$name.jpg"
  if (Test-Path $path) {
    Write-Output "SKIP $name (ya existe)"
    continue
  }

  # -rj fuerza JPEG. Sin el, un GIF ignora el redimensionado: la cabecera de
  # Servicios baja de 27 MB a ~11 KB solo por convertir el formato.
  $sized = ($url -replace '=w\d+$', '') + '=w1600-rj'

  $resp = $null
  foreach ($attempt in 1..5) {
    try {
      $resp = Invoke-WebRequest -Uri $sized -UseBasicParsing -TimeoutSec 60 -Headers $headers
      break
    } catch {
      if ($attempt -lt 5) { Start-Sleep -Seconds (6 * $attempt) }
    }
  }

  if ($null -eq $resp) {
    Write-Output "FAIL $name (403 tras 5 intentos)"
    $pending += $name
    $fail++
    Start-Sleep -Seconds 4
    continue
  }

  [System.IO.File]::WriteAllBytes($path, $resp.Content)
  $kb = [math]::Round($resp.Content.Length / 1KB, 1)
  Write-Output "OK   $name.jpg  ${kb}KB"
  $ok++

  Start-Sleep -Seconds 4
}

Write-Output ''
Write-Output "Descargadas: $ok   Fallidas: $fail"
if ($pending.Count -gt 0) {
  Write-Output "Pendientes: $($pending -join ', ')"
  Write-Output 'Google esta limitando. Espera unos minutos y vuelve a correr el script.'
} else {
  Write-Output 'Completo. La pagina ya sirve las imagenes desde public/img.'
}
