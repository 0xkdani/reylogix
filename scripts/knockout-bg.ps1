# Convierte un grafico de linea blanca sobre negro en un PNG con transparencia
# real: alfa = brillo del pixel, color = blanco. El negro del original pasa a ser
# alfa 0 y los bordes suavizados quedan semitransparentes, asi que el trazo se
# integra en cualquier fondo.
#
# Por que no basta CSS: mix-blend-mode: screen haria lo mismo sobre el papel,
# pero se aisla en cuanto un ancestro crea grupo de mezcla, y las tarjetas
# .liquid-glass lo crean por su backdrop-filter. Dentro de ellas el negro seguia
# tapando el video de fondo.
#
# Uso:  powershell -ExecutionPolicy Bypass -File scripts\knockout-bg.ps1 enfoque-collage

param([Parameter(Mandatory = $true)][string[]]$Name)

Add-Type -AssemblyName System.Drawing

$dir = Join-Path $PSScriptRoot '..\public\img'
$argb = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb

foreach ($n in $Name) {
  $src = Join-Path $dir "$n.jpg"
  $dst = Join-Path $dir "$n.png"

  if (-not (Test-Path $src)) {
    Write-Output "SKIP $n (falta $src; corre antes fetch-images.ps1)"
    continue
  }

  $bmp = [System.Drawing.Bitmap]::FromFile($src)
  $w = $bmp.Width
  $h = $bmp.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h

  $read = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, $argb)
  $len = $read.Stride * $h
  $buf = New-Object byte[] $len
  [System.Runtime.InteropServices.Marshal]::Copy($read.Scan0, $buf, 0, $len)
  $bmp.UnlockBits($read)
  $bmp.Dispose()

  # Orden en memoria: B G R A. Se toma el canal mas alto como alfa en lugar de la
  # luminancia ponderada para no adelgazar el trazo.
  for ($i = 0; $i -lt $len; $i += 4) {
    $a = $buf[$i]
    if ($buf[$i + 1] -gt $a) { $a = $buf[$i + 1] }
    if ($buf[$i + 2] -gt $a) { $a = $buf[$i + 2] }
    $buf[$i] = 255
    $buf[$i + 1] = 255
    $buf[$i + 2] = 255
    $buf[$i + 3] = $a
  }

  $outBmp = New-Object System.Drawing.Bitmap $w, $h, $argb
  $write = $outBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, $argb)
  [System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $write.Scan0, $len)
  $outBmp.UnlockBits($write)
  $outBmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
  $outBmp.Dispose()

  $kb = [math]::Round((Get-Item $dst).Length / 1KB, 1)
  Write-Output "OK   $n.png  ${w}x${h}  ${kb}KB"
}
