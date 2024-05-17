New-Item -Path "src", "styles", "dist" -Type Directory
("App","index","Widget") | ForEach-Object {
  New-Item -Path .\src -Name "$_.js"
}
New-Item -Type File -Path .\styles\App.css