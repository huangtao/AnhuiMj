

@echo off 

set "ff=%DATE:~2,2%%DATE:~5,2%%DATE:~8,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"
set "ff=%ff: =0%"
set "p=remote-assets"
set "region=qlahmj"
set "now=%cd%"


call MD %p%\%ff% 
call MD %p%\%ff%\res
call MD %p%\%ff%\src
call MD %p%\%ff%\backupjs

call node version_generator.js -v %ff% -u http://update.test.qileah.cn/hotupdate/%region%/hall/%ff%/ -s build/jsb-link/ -d %p%/%ff%

::call copy /Y %p%\%ff%\project.manifest build\jsb-binary\res\raw-assets\resources\project.manifest
::call copy /Y %p%\%ff%\project.manifest assets\resources\project.manifest


call xcopy build\jsb-link\res %p%\%ff%\res /S
call xcopy build\jsb-link\src %p%\%ff%\src /S
call xcopy "build\jsb-link\js backups (useful for debugging)" %p%\%ff%\backupjs /S

call "C:\Program Files\WinRAR\rar.exe" a -r -ep1 %p%\%ff%.rar %p%\%ff%

call explorer /e,/select,%now%\%p%\%ff%.rar
pause