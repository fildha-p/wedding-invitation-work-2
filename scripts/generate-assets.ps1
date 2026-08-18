$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path (Get-Location) "public\assets"
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

function New-Bitmap {
  param([string]$Path, [scriptblock]$Draw)

  $width = 1600
  $height = 2200
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  & $Draw $graphics $width $height

  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [int64]92
  )
  $bitmap.Save($Path, $encoder, $params)
  $graphics.Dispose()
  $bitmap.Dispose()
}

function Fill-VerticalGradient {
  param($G, $Rect, [string]$Top, [string]$Bottom)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $Rect,
    [System.Drawing.ColorTranslator]::FromHtml($Top),
    [System.Drawing.ColorTranslator]::FromHtml($Bottom),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
  )
  $G.FillRectangle($brush, $Rect)
  $brush.Dispose()
}

function Fill-EllipseColor {
  param($G, [int]$X, [int]$Y, [int]$W, [int]$H, [string]$Color)
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($Color))
  $G.FillEllipse($brush, $X, $Y, $W, $H)
  $brush.Dispose()
}

function Draw-FloralCluster {
  param($G, [int]$CenterX, [int]$CenterY, [double]$Scale)
  $leafBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(125, 139, 175, 90))
  $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 201, 168, 76))
  $redBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 139, 26, 26))
  for ($i = 0; $i -lt 22; $i += 1) {
    $angle = ($i * 36) * [Math]::PI / 180
    $rx = [int]($CenterX + [Math]::Cos($angle) * (80 + ($i % 5) * 18) * $Scale)
    $ry = [int]($CenterY + [Math]::Sin($angle) * (55 + ($i % 4) * 14) * $Scale)
    $G.FillEllipse($leafBrush, $rx, $ry, [int](80 * $Scale), [int](30 * $Scale))
  }
  for ($i = 0; $i -lt 14; $i += 1) {
    $angle = ($i * 51) * [Math]::PI / 180
    $rx = [int]($CenterX + [Math]::Cos($angle) * 95 * $Scale)
    $ry = [int]($CenterY + [Math]::Sin($angle) * 72 * $Scale)
    $brush = if ($i % 2 -eq 0) { $redBrush } else { $goldBrush }
    $G.FillEllipse($brush, $rx, $ry, [int](44 * $Scale), [int](44 * $Scale))
  }
  $leafBrush.Dispose()
  $goldBrush.Dispose()
  $redBrush.Dispose()
}

function Draw-CoupleSilhouette {
  param($G, [int]$X, [int]$Y, [double]$Scale)
  $shadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 34, 30, 28))
  $cream = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 250, 247, 242))
  $green = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 45, 80, 22))
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9A84C"), [single](5 * $Scale))
  $G.FillEllipse($shadow, [int]($X - 132 * $Scale), [int]($Y - 190 * $Scale), [int](92 * $Scale), [int](92 * $Scale))
  $G.FillRectangle($cream, [int]($X - 150 * $Scale), [int]($Y - 98 * $Scale), [int](126 * $Scale), [int](250 * $Scale))
  $G.FillEllipse($shadow, [int]($X + 48 * $Scale), [int]($Y - 198 * $Scale), [int](96 * $Scale), [int](96 * $Scale))
  $G.FillRectangle($green, [int]($X + 22 * $Scale), [int]($Y - 102 * $Scale), [int](145 * $Scale), [int](255 * $Scale))
  $G.DrawLine($goldPen, [int]($X - 22 * $Scale), [int]($Y + 42 * $Scale), [int]($X + 32 * $Scale), [int]($Y + 42 * $Scale))
  $shadow.Dispose()
  $cream.Dispose()
  $green.Dispose()
  $goldPen.Dispose()
}

function Draw-Text {
  param($G, [string]$Text, [int]$Y, [float]$Size)
  $font = New-Object System.Drawing.Font("Georgia", $Size, [System.Drawing.FontStyle]::Italic)
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 250, 247, 242))
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $G.DrawString($Text, $font, $brush, [System.Drawing.RectangleF]::new(0, $Y, 1600, 180), $format)
  $format.Dispose()
  $brush.Dispose()
  $font.Dispose()
}

New-Bitmap -Path (Join-Path $assetDir "couple1.jpg") -Draw {
  param($G, $W, $H)
  Fill-VerticalGradient $G ([System.Drawing.Rectangle]::new(0, 0, $W, $H)) "#1D2C18" "#6A5236"
  $stone = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#D9CDB8"))
  $door = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#4A2318"))
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9A84C"), 10)
  $G.FillRectangle($stone, 180, 260, 1240, 1620)
  $G.FillRectangle($door, 330, 480, 940, 1200)
  $G.DrawRectangle($goldPen, 370, 520, 390, 1120)
  $G.DrawRectangle($goldPen, 840, 520, 390, 1120)
  $G.DrawLine($goldPen, 800, 480, 800, 1680)
  Fill-EllipseColor $G 756 1030 44 44 "#C9A84C"
  Fill-EllipseColor $G 802 1030 44 44 "#C9A84C"
  Draw-FloralCluster $G 800 285 1.2
  Draw-FloralCluster $G 330 520 0.6
  Draw-FloralCluster $G 1240 520 0.6
  Draw-Text $G "Dr Aiswarya & Dr Anugrah" 1720 78
  $stone.Dispose()
  $door.Dispose()
  $goldPen.Dispose()
}

New-Bitmap -Path (Join-Path $assetDir "couple2.jpg") -Draw {
  param($G, $W, $H)
  Fill-VerticalGradient $G ([System.Drawing.Rectangle]::new(0, 0, $W, $H)) "#BFD9DA" "#FAF7F2"
  $sea = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 68, 128, 148))
  $floor = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E8DDC9"))
  $door = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#4A2318"))
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9A84C"), 8)
  $G.FillRectangle($sea, 0, 880, $W, 260)
  $G.FillRectangle($floor, 0, 1400, $W, 800)
  $G.FillPolygon($door, @(
    [System.Drawing.Point]::new(0, 350),
    [System.Drawing.Point]::new(520, 560),
    [System.Drawing.Point]::new(520, 1740),
    [System.Drawing.Point]::new(0, 2020)
  ))
  $G.FillPolygon($door, @(
    [System.Drawing.Point]::new($W, 350),
    [System.Drawing.Point]::new(1080, 560),
    [System.Drawing.Point]::new(1080, 1740),
    [System.Drawing.Point]::new($W, 2020)
  ))
  $G.DrawLine($goldPen, 520, 560, 520, 1740)
  $G.DrawLine($goldPen, 1080, 560, 1080, 1740)
  Draw-CoupleSilhouette $G 800 1470 1.55
  Draw-FloralCluster $G 800 470 0.95
  Draw-Text $G "Welcome to the celebration" 1840 64
  $sea.Dispose()
  $floor.Dispose()
  $door.Dispose()
  $goldPen.Dispose()
}

New-Bitmap -Path (Join-Path $assetDir "couple3.jpg") -Draw {
  param($G, $W, $H)
  Fill-VerticalGradient $G ([System.Drawing.Rectangle]::new(0, 0, $W, $H)) "#2D5016" "#1E1A16"
  $cream = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#FAF7F2"))
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9A84C"), 7)
  $shadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 0, 0, 0))
  for ($i = 0; $i -lt 8; $i += 1) {
    $x = 170 + ($i * 180)
    $G.FillRectangle($cream, $x, 260, 70, 1100)
    $G.DrawLine($goldPen, $x + 35, 260, $x + 35, 1360)
  }
  for ($i = 0; $i -lt 5; $i += 1) {
    $cx = 360 + ($i * 220)
    $G.DrawEllipse($goldPen, $cx - 80, 170, 160, 130)
    Fill-EllipseColor $G ($cx - 24) 270 48 48 "#C9A84C"
  }
  $G.FillPolygon($shadow, @(
    [System.Drawing.Point]::new(180, $H),
    [System.Drawing.Point]::new(1420, $H),
    [System.Drawing.Point]::new(980, 1220),
    [System.Drawing.Point]::new(620, 1220)
  ))
  Draw-CoupleSilhouette $G 800 1410 1.45
  Draw-FloralCluster $G 260 350 0.65
  Draw-FloralCluster $G 1340 350 0.65
  Draw-Text $G "Grand Hall Interior" 1780 62
  $cream.Dispose()
  $goldPen.Dispose()
  $shadow.Dispose()
}

New-Bitmap -Path (Join-Path $assetDir "couple4.jpg") -Draw {
  param($G, $W, $H)
  Fill-VerticalGradient $G ([System.Drawing.Rectangle]::new(0, 0, $W, $H)) "#CFE0D1" "#FAF7F2"
  $terrace = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E5D8C1"))
  $sea = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 85, 142, 157))
  $archPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#2D5016"), 18)
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9A84C"), 6)
  $G.FillRectangle($sea, 0, 820, $W, 210)
  $G.FillRectangle($terrace, 0, 1120, $W, 1080)
  $G.DrawArc($archPen, 330, 315, 940, 1150, 180, 180)
  $G.DrawLine($archPen, 330, 890, 330, 1530)
  $G.DrawLine($archPen, 1270, 890, 1270, 1530)
  $G.DrawArc($goldPen, 390, 385, 820, 1040, 180, 180)
  Draw-FloralCluster $G 420 760 0.75
  Draw-FloralCluster $G 1180 760 0.75
  Draw-FloralCluster $G 800 360 1.05
  Draw-CoupleSilhouette $G 800 1440 1.65
  Draw-Text $G "Dr Aiswarya & Dr Anugrah" 1745 76
  $terrace.Dispose()
  $sea.Dispose()
  $archPen.Dispose()
  $goldPen.Dispose()
}
