@echo off
echo Setting up Angular structure...

REM ======================
REM CORE
REM ======================
mkdir src\app\core\interceptors 2>nul
type nul > src\app\core\providers.ts

REM ======================
REM SHARED
REM ======================
mkdir src\app\shared\components 2>nul
mkdir src\app\shared\pipes 2>nul
mkdir src\app\shared\utils 2>nul

type nul > src\app\shared\utils\date.utils.ts
type nul > src\app\shared\utils\string.utils.ts

REM ======================
REM FEATURES - AUTH
REM ======================
mkdir src\app\features\auth\components 2>nul
mkdir src\app\features\auth\services 2>nul
mkdir src\app\features\auth\models 2>nul

type nul > src\app\features\auth\auth.routes.ts
type nul > src\app\features\auth\auth.guard.ts

REM ======================
REM FEATURES - DASHBOARD
REM ======================
mkdir src\app\features\dashboard\widgets 2>nul

type nul > src\app\features\dashboard\dashboard.component.ts
type nul > src\app\features\dashboard\dashboard.routes.ts

REM ======================
REM FEATURES - PRODUCTS
REM ======================
mkdir src\app\features\products\product-list 2>nul
mkdir src\app\features\products\product-detail 2>nul

type nul > src\app\features\products\products.routes.ts

REM ======================
REM LAYOUTS
REM ======================
mkdir src\app\layouts\main-layout 2>nul
mkdir src\app\layouts\auth-layout 2>nul

REM ======================
REM ROOT APP FILES
REM ======================
type nul > src\app\app.routes.ts

echo Done!
pause