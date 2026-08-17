# Descarga a public/img las 9 fotos del corredor de Blackline
# (components/ui/image-stream-hero). Los nombres coinciden con STREAM en
# src/images.ts.
#
# Por que se descargan en vez de enlazar a images.unsplash.com: el sitio
# elimino todos los origenes externos por rendimiento —la fuente Inter se
# auto-alojo por lo mismo— y cada origen nuevo cuesta DNS + TLS antes del
# primer byte. Ademas Unsplash limita por rafagas.
#
# Todas son de licencia Unsplash gratuita, verificadas una a una: la busqueda
# mezcla libres con Unsplash+ de pago, y las de pago resuelven a
# plus.unsplash.com/premium_photo-, que aqui no se usa ninguna.
#
# El recorte se pide en origen. Las tarjetas del corredor son 18x25 en unidades
# de mundo (relacion 0.72, retrato), asi que una foto apaisada la destrozaria
# object-cover: w=520&h=720&fit=crop la entrega ya vertical.
#
# Es idempotente: lo ya descargado se salta.
#
# Uso:  powershell -ExecutionPolicy Bypass -File scripts\fetch-stream-images.ps1
#       (despues:  python scripts\to-webp.py)

$ErrorActionPreference = 'Stop'

# Orden intencionado: el corredor pinta indices consecutivos a profundidades
# consecutivas, asi que logistica y dato financiero van alternados para que la
# mezcla se lea en todo momento y no por tandas.
$fotos = @(
  @{ n = 'stream-01'; id = 'photo-1758745791998-11ea5eb5df40'; autor = 'Thomas Nolte';      que = 'Gruas de contenedores en Bremerhaven, de noche' }
  @{ n = 'stream-02'; id = 'photo-1611974789855-9c2a0a7236a3'; autor = 'Maxim Hopman';      que = 'Grafico de velas sobre fondo oscuro' }
  @{ n = 'stream-03'; id = 'photo-1771756743992-bc772a4f8d7e'; autor = 'Stock Birken';      que = 'Buque de carga en Hamburgo, de noche' }
  @{ n = 'stream-04'; id = 'photo-1750969185331-e03829f72c7d'; autor = 'Max Petrunin';      que = 'Lineas y puntos azules sobre negro, el dato en abstracto' }
  @{ n = 'stream-05'; id = 'photo-1768212400630-2838caba07e1'; autor = 'Tsuyoshi Kozu';     que = 'Avion sobre puerto industrial iluminado' }
  @{ n = 'stream-06'; id = 'photo-1764534161906-f08540a2d333'; autor = 'Ivan Baton';        que = 'Distrito de edificios de noche, en azul' }
  @{ n = 'stream-07'; id = 'photo-1766788177821-2b3110a18bbe'; autor = 'Albert Stoynov';    que = 'Puerto de Vancouver, gruas y reflejos' }
  @{ n = 'stream-08'; id = 'photo-1730860763372-ae1ef7d8d538'; autor = 'Phil Desforges';    que = 'Distrito frente al agua a la hora azul, Montreal' }
  @{ n = 'stream-09'; id = 'photo-1621697944804-d0a393f7e01a'; autor = 'Razvan Mirel';      que = 'Portacontenedores Margrethe Maersk, Aarhus' }
)

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
$out = Join-Path $PSScriptRoot '..\public\img'
New-Item -ItemType Directory -Force -Path $out | Out-Null

$ok = 0
$fail = 0

foreach ($f in $fotos) {
  $path = Join-Path $out "$($f.n).jpg"
  if (Test-Path $path) {
    Write-Output "SKIP $($f.n) (ya existe)"
    continue
  }

  $url = "https://images.unsplash.com/$($f.id)?w=520&h=720&fit=crop&fm=jpg&q=80"

  $resp = $null
  foreach ($intento in 1..4) {
    try {
      $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60 -Headers @{ 'User-Agent' = $ua }
      break
    } catch {
      if ($intento -lt 4) { Start-Sleep -Seconds (3 * $intento) }
    }
  }

  if ($null -eq $resp) {
    Write-Output "FAIL $($f.n)  $($f.autor) - $($f.que)"
    $fail++
    continue
  }

  [System.IO.File]::WriteAllBytes($path, $resp.Content)
  $kb = [math]::Round($resp.Content.Length / 1KB, 1)
  Write-Output "OK   $($f.n).jpg  ${kb}KB  $($f.autor) - $($f.que)"
  $ok++

  Start-Sleep -Milliseconds 600
}

Write-Output ''
Write-Output "Descargadas: $ok   Fallidas: $fail"
if ($fail -eq 0) {
  Write-Output 'Ahora:  python scripts\to-webp.py'
}
