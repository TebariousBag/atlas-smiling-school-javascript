$(document).ready(function () {
    // QUOTES CAROUSEL
    const $quotesCarouselInner = $('.quotes .carousel-inner');
    const $quotesLoader = $('.quotes .loader');
    // Quotes API request
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      method: 'GET',
      beforeSend: function () {
        $quotesLoader.show();
      },
      success: function (data) {
        $quotesLoader.hide();
        $quotesCarouselInner.empty();

        data.forEach((quote, index) => {
          const activeClass = index === 0 ? 'active' : '';
          const quoteItem = `
            <div class="carousel-item ${activeClass}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${quote.pic_url}" class="d-block align-self-center rounded-circle" alt="${quote.name}">
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">« ${quote.text} »</p>
                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                    <span class="text-white">${quote.title}</span>
                  </div>
                </div>
              </div>
            </div>`;
          $quotesCarouselInner.append(quoteItem);
        });

        // Re-initialize carousel after loading content
        $('#quotesCarousel').carousel({
          interval: false,
          ride: false
        });
      },
      error: function () {
        $quotesLoader.hide();
        $quotesCarouselInner.append('<div class="text-danger">Failed to load quotes</div>');
      }
    });
});

// POPULAR VIDEOS SECTION
$(document).ready(function () {
    function loadPopularTutorials() {
      const url = 'https://smileschool-api.hbtn.info/popular-tutorials';
      const loader = $('#popular-loader');
      const carousel = $('#popular-carousel');
        // Show loader and clear carousel
      loader.show();
      carousel.addClass('d-none').empty();
        // Fetch data from API
      $.get(url, function (data) {
        loader.hide();
        data.forEach(tutorial => {
          const card = `
            <div class="px-2">
              <div class="card h-100 shadow-sm">
                <img src="${tutorial.thumb_url}" class="card-img-top" alt="${tutorial.title}">
                <div class="card-body">
                  <h5 class="card-title">${tutorial.title}</h5>
                  <p class="card-text">${tutorial['sub-title']}</p>
                  <p class="card-text small text-muted">By ${tutorial.author} • ${tutorial.duration}</p>
                </div>
              </div>
            </div>
          `;
          carousel.append(card);
        });
  
        // Initialize slick carousel
        carousel.removeClass('d-none').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false,
          prevArrow: `<button type="button" class="slick-prev custom-slick-arrow">
                <img src="images/arrow_black_left.png" alt="Previous">
              </button>`,
           nextArrow: `<button type="button" class="slick-next custom-slick-arrow">
                <img src="images/arrow_black_right.png" alt="Next">
              </button>`,
              // Responsive settings
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });
    }
  
    // Only run on homepage
    if (window.location.pathname.includes('homepage.html')) {
      loadPopularTutorials();
    }
});

// LATEST VIDEOS SECTION
$(document).ready(function () {
    function loadLatestVideos() {
      const url = 'https://smileschool-api.hbtn.info/latest-videos';
      const loader = $('#latest-loader');
      const carousel = $('#latest-carousel');
        // Show loader and clear carousel
      loader.show();
      carousel.addClass('d-none').empty();
        // Fetch data from API
        // added play button
      $.get(url, function (data) {
        loader.hide();
        data.forEach(video => {
          const card = `
            <div class="px-2">
              <div class="card h-100 shadow-sm">
              <div class="video-thumbnail-wrapper">
                <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}">
                <img src="images/play.png" class="play-button" alt="Play">
              </div>
                <div class="card-body">
                  <h5 class="card-title">${video.title}</h5>
                  <p class="card-text">${video['sub-title']}</p>
                  <p class="card-text small text-muted">By ${video.author} • ${video.duration}</p>
                </div>
              </div>
            </div>
          `;
          carousel.append(card);
        });
  
        // Initialize slick carousel
        carousel.removeClass('d-none').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false,
          prevArrow: `<button type="button" class="slick-prev custom-slick-arrow">
                        <img src="images/arrow_black_left.png" alt="Previous">
                      </button>`,
          nextArrow: `<button type="button" class="slick-next custom-slick-arrow">
                        <img src="images/arrow_black_right.png" alt="Next">
                      </button>`,
        // Responsive settings
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });
    }
  
    // Only run on homepage
    if (window.location.pathname.includes('homepage.html')) {
      loadLatestVideos();
    }
});
