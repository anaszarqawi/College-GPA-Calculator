$.fn.shake = function(interval = 100){
    this.addClass('shaking');
    this.css('transition', 'all ' + (interval / 100).toString() + 's');
    setTimeout(() => {
        this.css('transform', 'translateX(-50%)');
    }, interval * 0);
    setTimeout(() => {
        this.css('transform', 'translateX(50%)');
    }, interval * 1);
    setTimeout(() => {
        this.css('transform', 'translateX(-25%)');
    }, interval * 2);
    setTimeout(() => {
        this.css('transform', 'translateX(25%)');
    }, interval * 3);
    setTimeout(() => {
        this.css('transform', 'translateX(-7%)');
    }, interval * 4);
    setTimeout(() => {
        this.css('transform', 'translateX(0%)');
    }, interval * 5);
    this.removeClass('shaking');
};