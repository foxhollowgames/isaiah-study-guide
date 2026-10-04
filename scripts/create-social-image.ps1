# Regenerate the static sharing card on Windows. No external dependencies are required.
Add-Type -AssemblyName System.Drawing
$outputPath = Join-Path $PSScriptRoot '../dist/assets/isaiah-share-v1.png'
$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = 'AntiAlias'
$graphics.TextRenderingHint = 'AntiAliasGridFit'
$background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, 1200, 630),
    [System.Drawing.ColorTranslator]::FromHtml('#04192d'),
    [System.Drawing.ColorTranslator]::FromHtml('#0b3c58'), 0)
$white = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#f4e7d1'))
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#b5cfdf'))
$cyan = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#8ce9ff'))
$ring = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(55, 140, 233, 255), 2)
$accent = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#8ce9ff'), 3)
$title = [System.Drawing.Font]::new('Georgia', 78, [System.Drawing.FontStyle]::Bold, 'Pixel')
$subtitle = [System.Drawing.Font]::new('Segoe UI', 34, [System.Drawing.FontStyle]::Regular, 'Pixel')
$body = [System.Drawing.Font]::new('Segoe UI', 27, [System.Drawing.FontStyle]::Regular, 'Pixel')
$small = [System.Drawing.Font]::new('Segoe UI', 21, [System.Drawing.FontStyle]::Regular, 'Pixel')
try {
    $graphics.FillRectangle($background, 0, 0, 1200, 630)
    $graphics.DrawRectangle($ring, 24, 24, 1152, 582)
    $graphics.DrawEllipse($ring, 790, 115, 400, 400)
    $graphics.DrawEllipse($ring, 835, 160, 310, 310)
    $graphics.DrawLine($ring, 990, 75, 990, 555)
    $graphics.DrawLine($ring, 750, 315, 1200, 315)
    $points = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new(990, 180), [System.Drawing.PointF]::new(1018, 287),
        [System.Drawing.PointF]::new(1125, 315), [System.Drawing.PointF]::new(1018, 343),
        [System.Drawing.PointF]::new(990, 450), [System.Drawing.PointF]::new(962, 343),
        [System.Drawing.PointF]::new(855, 315), [System.Drawing.PointF]::new(962, 287)
    )
    $graphics.FillPolygon($cyan, $points)
    $graphics.DrawLine($accent, 76, 130, 166, 130)
    $graphics.DrawString('ISAIAH', $title, $white, 70, 175)
    $graphics.DrawString('STUDY GUIDE', $subtitle, $cyan, 76, 279)
    $graphics.DrawString('Explore all 66 chapters.', $body, $white, 76, 369)
    $graphics.DrawString('Scripture. Maps. Historical context.', $body, $muted, 76, 413)
    $graphics.DrawString('isaiah.josephnewelldesign.com', $small, $muted, 76, 530)
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
    foreach ($resource in @($graphics, $bitmap, $background, $white, $muted, $cyan, $ring, $accent, $title, $subtitle, $body, $small)) {
        $resource.Dispose()
    }
}
