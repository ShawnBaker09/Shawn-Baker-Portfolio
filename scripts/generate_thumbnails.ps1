<#
Generate JPG thumbnails from PDFs using ImageMagick's `magick` CLI.

Prerequisites:
- Install ImageMagick and ensure `magick` is in your PATH: https://imagemagick.org

Usage (from repository root in PowerShell):
  .\scripts\generate_thumbnails.ps1 -Source "assets/images/certifications" -Density 150 -MaxSize 1600

This will create JPGs for each PDF's first page in the same folder, named like "Name.jpg".
#>

param(
  [Parameter(Mandatory=$false)] [string] $Source = "assets/images/certifications",
  [int] $Density = 150,
  [int] $MaxSize = 1200
)

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
  Write-Error "ImageMagick 'magick' not found in PATH. Please install ImageMagick and ensure 'magick' is available.";
  exit 1;
}

$srcPath = Join-Path (Get-Location) $Source
if (-not (Test-Path $srcPath)) {
  Write-Error "Source path not found: $srcPath";
  exit 1;
}

Write-Host "Generating thumbnails in: $srcPath" -ForegroundColor Cyan

Get-ChildItem -Path $srcPath -Filter *.pdf | ForEach-Object {
  $pdf = $_.FullName
  $base = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  $out = Join-Path $srcPath ($base + ".jpg")

  Write-Host "Processing: $($_.Name) -> $($base + '.jpg')"

  # Convert first page [0] to JPG, set density and quality, constrain size
  $args = @(
    "-density", $Density,
    "`"$pdf`"",
    "[0]",
    "-quality", "85",
    "-resize", "${MaxSize}x${MaxSize}",
    "`"$out`""
  )

  $procInfo = New-Object System.Diagnostics.ProcessStartInfo
  $procInfo.FileName = "magick"
  $procInfo.Arguments = $args -join ' '
  $procInfo.RedirectStandardOutput = $true
  $procInfo.RedirectStandardError = $true
  $procInfo.UseShellExecute = $false
  $proc = [System.Diagnostics.Process]::Start($procInfo)
  $proc.WaitForExit()
  if ($proc.ExitCode -ne 0) {
    $err = $proc.StandardError.ReadToEnd()
    Write-Warning "magick failed for $pdf: $err"
  }
}

Write-Host "Done." -ForegroundColor Green
