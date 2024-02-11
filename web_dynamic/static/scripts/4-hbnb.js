$(document).ready(function () {
  const checked_list = {};

  $.ajax({
    type: "GET",
    url: "http://localhost:5001/api/v1/status/",
    dataType: "json",
    success: function (response) {
      if (response.status == "OK") {
        $('.api_status').addClass('available');
      }
    }
  });

  $('input[type=checkbox]').click(function () {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      if(this.checked){
        checked_list[key] = value;
      }else{
        delete checked_list[key]
      }
      $('.amenities h4').text(Object.values(checked_list).join(', '));
  });

  $('button').click(function () {
        console.log("clicked");
        console.log(checked_list);
    $('.places').empty();
    fetchData();
  });

  function fetchData() {
    const url = 'http://localhost:5001/api/v1/places_search/';
    $.ajax({
      type: "POST",
      url: url,
      contentType: "application/json",
      data: JSON.stringify({ amenities: Object.keys(checked_list) }),
      success: function (response) {
        console.log("data is ", response)
        for (const place of response) {
          const article = `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>
          `;
          $('.places').append(article);
        }
        console.log("here I'm running")
      }
    });
  }
  fetchData();
});
