$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:5001/api/v1/status/",
    dataType: "json",
    success: function (response) {
      if (response.status == "OK")
      {
        $('.api_status').addClass('available');
      }
    }
  });
});
