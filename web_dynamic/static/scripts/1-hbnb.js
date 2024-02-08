$(document).ready(function () {
    const elements = $("DIV.amenities ul li").toArray();
    const htmls = elements.map(element => $(element).html());

    htmls.map((element, key)=> console.log(`${key} = ${element}`))
});
