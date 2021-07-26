<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College GPA Calculator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        <?php include '../css/semester/style.css' ?><?php include '../css/Options/style.css' ?><?php include '../css/GPA/style.css' ?>
    </style>
</head>

<body>
    <div id="container">
        <div class="semesters">
            <?php include './semester.php' ?>
        </div>
        <button class="add-semester" title="Add another Semester">Add Semester</button>
        <div class="totalSemester">
            <?php include './GPA.php' ?>
        </div>

    </div>
    <script>
        <?php include '../js/jquery-3.6.0.min.js' ?>
        <?php include '../js/script.js' ?>
        <?php include '../js/shake-element-transform/shake.js' ?>
        <?php include '../js/termvader-jquery-vibrate-v1.0.1-10-gd098494/jquery.vibrate.min.js' ?>
    </script>
</body>

</html>