# Regenerate the browser and Apple icons from the header's compass path on Windows.
Add-Type -AssemblyName System.Drawing
$distPath = Join-Path $PSScriptRoot '../dist'
foreach ($size in @(32, 180)) {
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = 'AntiAlias'
    $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#04192d'))
    $graphics.ScaleTransform($size / 32.0, $size / 32.0)
    $graphics.TranslateTransform(4, 4)
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $path.AddBezier(12, 0, 14, 8, 16, 10, 24, 12)
    $path.AddBezier(24, 12, 16, 14, 14, 16, 12, 24)
    $path.AddBezier(12, 24, 10, 16, 8, 14, 0, 12)
    $path.AddBezier(0, 12, 8, 10, 10, 8, 12, 0)
    $path.CloseFigure()
    $brush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#8ce9ff'))
    $stream = [System.IO.MemoryStream]::new()
    try {
        $graphics.FillPath($brush, $path)
        if ($size -eq 180) {
            $bitmap.Save((Join-Path $distPath 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
            $png = $stream.ToArray()
            $file = [System.IO.File]::Create((Join-Path $distPath 'favicon.ico'))
            $writer = [System.IO.BinaryWriter]::new($file)
            try {
                $writer.Write([uint16]0)
                $writer.Write([uint16]1)
                $writer.Write([uint16]1)
                $writer.Write([byte]32)
                $writer.Write([byte]32)
                $writer.Write([byte]0)
                $writer.Write([byte]0)
                $writer.Write([uint16]1)
                $writer.Write([uint16]32)
                $writer.Write([uint32]$png.Length)
                $writer.Write([uint32]22)
                $writer.Write($png)
            } finally { $writer.Dispose() }
        }
    } finally {
        foreach ($resource in @($stream, $brush, $path, $graphics, $bitmap)) { $resource.Dispose() }
    }
}
