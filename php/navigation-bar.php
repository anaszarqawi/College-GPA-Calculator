<div class="nav">
    <div class="logo">
        <a href="../../home.php" alt='Anas Zarqawi'>
            <img src="../../assets/svg/anas-zaqrawi-logo.svg" alt="Anas Zarqawi" title="Anas Zarqawi logo">
        </a>
    </div>
    <div class="menu-items">
        <ul>
            <li><a href="../../php/about/about.php" class="About">About</a></li>
            <!-- <li><a href="#" class="skills">Skills</a></li> -->
            <li><a href="../../php/projects/projects-page.php" class="projects">Projects</a></li>
            <!-- <li><a href="#" class="portfolio">Portfolio</a></li> -->
            <li><a href="../../php/services/services.php" class="services-item">Services</a></li>
            <li><a href="#" class="contact">Contact</a></li>
        </ul>
    </div>
</div>

<script>
    var prev = 50;
    var $window = $(window);
    var nav = $('.nav');

    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop();
        nav.toggleClass('hidden', scrollTop > prev);
        //prev = scrollTop;
        console.log(scrollTop);
    });
</script>