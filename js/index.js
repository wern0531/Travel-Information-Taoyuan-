const administrativeArea = ["桃園區", "中壢區", "八德區", "平鎮區", "龜山區", "蘆竹區", "大園區", "觀音區", "新屋區", "楊梅區", "龍潭區", "大溪區", "復興區"]
const AttractionData = [];
const list = document.querySelector('.list')
const choose = document.querySelector('#choose')
const hotData = document.querySelector('.hotData');

function init() {
    getArea()
    getData();
}
init();

function getArea() {
    let str = '';
    str += `<option value="">--請選擇行政區--</option>`
    administrativeArea.forEach(function (item) {

        str += `<option value="${item}">${item}</option>`
    })
    choose.innerHTML = str;
}

function getData() {
    axios.get("https://data.tycg.gov.tw/api/v1/dump/datastore/bd906b29-9006-40ed-8bd7-67597c2577fc")
        .then(function (res) {
            // console.log(res.data.infos);
            let data = res.data.infos;
            data.forEach(function (item) {
                AttractionData.push(item);
            })
        })
}

choose.addEventListener('change', changeplace);
hotData.addEventListener('click', changeplace);

function changeplace(e) {
    let str = '';
    AttractionData.forEach(function (item) {
        let freeTicket = '';
        if (item.Ticketinfo == "免費") {
            freeTicket = "免費參觀";
        } else {
            freeTicket = "依規定";
        }
        let tel = '';
        if (item.Tel == "") {
            tel = "無";
        } else {
            tel = item.Tel
        }
        // let Website = '';
        // if (item.Website == '') {
        //     Website = ''
        // } else {
        //     Website = item.Website
        // }
        if (item.Add.includes(e.target.value)) {
            str += `
            <div class="content">
                <div class="smallImg" )">
                    <a href="${item.TYWebsite}"><p class="smallImgname">${item.Name}</p></a>
                </div>
                <div class="openData">
                    <div class="smallImgopendata">
                       
                       <p class = "Add"><img src="images/icons_pin.png" alt="">${item.Add}</p>
                       <p><img src="images/icons_phone.png" alt="">${tel}</p>
                    </div>
                    <div class="smallImgfree">
                       <p><img src="images/icons_tag.png" alt="">${freeTicket}</p>
                    </div>
                </div>
            </div>`
        }
    })
    list.innerHTML = str;
}
