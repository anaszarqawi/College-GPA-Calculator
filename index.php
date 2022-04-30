<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College GPA Calculator</title>
    <link rel="icon" type="image/png" href="./assets/icon-05.png" />
    <meta property="og:title" content="College GPA Calculator" />
    <meta property="og:description" content="This calculator is designed to calculate your GPA by specifying your current GPA in a letter, percentage, or grade for one semester or more. It will also give you your grade as Letter Grade, percentage, and estimate." />
    <meta property="og:image" content="./scss/logo.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        <?php include './scss/GPA/style.css' ?><?php include './scss/Options/style.css' ?><?php include './scss/semester/style.css' ?><?php include './scss/mobile-style-520px/style.css' ?><?php include './scss/mobile-style-450px/style.css' ?><?php include './scss/mobile-style-366px/style.css' ?><?php include './scss/navigation-bar/style.css' ?>
    </style>
</head>

<body>
    <div class="nav-upper">
        <a href="https://anaszarqawi.com/about-me/" target="blank"><img src="./assets/anas-zaqrawi-logo.svg" alt="Anas Zarqawi" title="Anas Zarqawi logo"></a>
    </div>
    <div class="nav-Lower">
        <span class="website-title">College GPA Calculator</span>
        <div class="add-semester" title="Add another Semester">
            <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>

        </div>
    </div>
    <div id="container">
        <div class="semesters">
            <?php include './php/semester.php' ?>
        </div>

        <div class="totalSemester">
            <div class="Total_GPA">
                <span>Total GPA</span>
            </div>
            <?php include './php/GPA.php' ?>
        </div>
    </div>
    <footer>
        <p class="copyright">anaszarqawi_ © 2022</p>
        <a href="https://github.com/Anaszarqawi/College-GPA-Calculator" target="_blank" class="github">source code on github</a>
    </footer>




    <script>
        <?php include './js/jquery-3.6.0.min.js' ?>
        <?php include './js/shake-element-transform/shake.js' ?>
        <?php include './js/script.js' ?>
    </script>
</body>

</html>