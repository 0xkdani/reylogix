# Extrae las URLs de imagen del HTML crudo y las mapea al texto que las rodea,
# para saber a que seccion pertenece cada una.

$ErrorActionPreference = 'Stop'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
$html = (Invoke-WebRequest -Uri 'https://sites.google.com/view/reylogix' -UseBasicParsing -TimeoutSec 60 -Headers @{ 'User-Agent' = $ua }).Content

$out = Join-Path $PSScriptRoot '..\public\img'
New-Item -ItemType Directory -Force -Path $out | Out-Null

$matches = [regex]::Matches($html, 'https://lh[0-9]\.googleusercontent\.com/[A-Za-z0-9_\-/=.]+')

$seen = @{}
$i = 0
foreach ($m in $matches) {
  $url = $m.Value
  if ($seen.ContainsKey($url)) { continue }
  $seen[$url] = $true
  $i++

  # Texto visible alrededor de la imagen (500 chars antes y despues, sin tags).
  $start = [Math]::Max(0, $m.Index - 1200)
  $len = [Math]::Min(2400, $html.Length - $start)
  $window = $html.Substring($start, $len)
  $text = [regex]::Replace($window, '<[^>]+>', ' ')
  $text = [regex]::Replace($text, '\s+', ' ').Trim()
  if ($text.Length -gt 260) { $text = $text.Substring(0, 260) }

  Write-Output "=== [$i] len=$($url.Length)"
  Write-Output "CTX: $text"
  $url | Out-File -FilePath (Join-Path $out "_urls.txt") -Append -Encoding utf8
}
Write-Output "TOTAL UNICAS: $i"
