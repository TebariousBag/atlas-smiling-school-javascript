$(document).ready(function () {
    // QUOTES CAROUSEL
    const $quotesCarouselInner = $('.quotes .carousel-inner');
    const $quotesLoader = $('.quotes .loader');
  
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
      },
      error: function () {
        $quotesLoader.hide();
        $quotesCarouselInner.append('<div class="text-danger">Failed to load quotes</div>');
      }
    });
  
    // TUTORIALS CAROUSEL
    const $tutorialsCarouselInner = $('#carouselTutorials');
    const $tutorialLoader = $('.popular-tutorials .loader');
  
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      method: 'GET',
      beforeSend: function () {
        $tutorialLoader.show();
      },
      success: function (data) {
        $tutorialLoader.hide();
        $tutorialsCarouselInner.empty();
      
        // Group tutorials into sets of 4 per carousel-item
        for (let i = 0; i < data.length; i += 4) {
          const activeClass = i === 0 ? 'active' : '';
      
          let cards = '';
          for (let j = i; j < i + 4 && j < data.length; j++) {
            const tutorial = data[j];
            cards += `
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="card h-100">
                  <img src="${tutorial.thumb_url}" class="card-img-top" alt="${tutorial.title}">
                  <div class="card-body">
                    <h5 class="card-title">${tutorial.title}</h5>
                    <p class="card-text">${tutorial['sub-title']}</p>
                    <div class="d-flex align-items-center mt-3">
                      <img src="${tutorial.author_pic_url}" class="rounded-circle mr-2" width="30" height="30" alt="${tutorial.author}">
                      <small class="text-muted">${tutorial.author}</small>
                    </div>
                    <div class="mt-2">
                      <span class="text-warning">${'★'.repeat(tutorial.star)}${'☆'.repeat(5 - tutorial.star)}</span>
                      <small class="text-muted float-right">${tutorial.duration}</small>
                    </div>
                  </div>
                </div>
              </div>`;
          }
      
          const slide = `
            <div class="carousel-item ${activeClass}">
              <div class="row">
                ${cards}
              </div>
            </div>`;
      
          $tutorialsCarouselInner.append(slide);
        }
      
        $('#tutorialCarousel').carousel({
          interval: false,
          ride: false
        });
      },
      error: function () {
        $tutorialLoader.hide();
        $tutorialsCarouselInner.append('<div class="text-danger">Failed to load tutorials</div>');
      }
    });
  });
