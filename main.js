// 1. image-wrap 클래스를 가진 요소들을 변수로 선언
const imageWraps = document.querySelectorAll(".img-wrapper");
console.log(imageWraps);

// 2. 클래스를 만들어 데이터 저장
class ImageData {
  constructor(dataIndex, title, subtitle, format, outcome, date) {
    this.dataIndex = dataIndex;
    this.title = title;
    this.subtitle = subtitle;
    this.format = format;
    this.outcome = outcome;
    this.date = date;
  }
}

// 이미지 데이터 객체 생성 예시
const imageDataArray = [
  new ImageData('2023-05-24', 'JPEG', 'Photoshop', 'Beautiful sunset', 'Sunset Image', 'https://example.com/image.jpg', 201901),
  new ImageData('2022m1', '마스크팅', '가면을 쓰고 진행하는 소개팅 서비스', 'uiux', 'website', 2022),
  new ImageData('2021z1', 'zine', '엄니식당', 'illustration', 'zine', 2021),
];


$('.img-wrapper').hover(
  function(event) {
    var imageWrap = this;
    var captionDiv = $(imageWrap).find('.image-caption');
    var currentIndex = $(this).data('index');

    var selectedImageData = imageDataArray.find(function(imageData) {
      return imageData.dataIndex === currentIndex;
    });
    console.log(selectedImageData);

    if (captionDiv.length === 0) {
      console.log('captionDiv.length === 0');
      captionDiv = $('<div>').addClass('image-caption');
      captionDiv.html(`
        <p style="font-size: 16px;">Title: ${selectedImageData.title}</p>\n
        <p style="font-size: 14px;">Subtitle: ${selectedImageData.subtitle}</p>\n
        <p style="font-size: 14px;">Format: ${selectedImageData.format}</p>\n
        <p style="font-size: 16px;">Outcome: ${selectedImageData.outcome}</p>\n
        <p style="font-size: 14px;">Date: ${selectedImageData.date}</p>\n
      `);

      // 이미지 요소 위에 위치시키기 위해 스타일 설정
      captionDiv.css({
        'position': 'fixed',
        'top': 300 + 'px',
        'left': 300 + 'px'
      });
      $('body').append(captionDiv);
    }
  },
  function() {
    var captionDiv = $('body').find('.image-caption');
    captionDiv.remove();
  }
);

// 1. 체크박스 선택 여부에 따라 selectedCategories 배열 업데이트
const selectedCategories = []; // 선택된 카테고리를 저장할 배열

$('.category input[type="checkbox"]').change(function() {
  const category = $(this).val();
  if ($(this).is(':checked')) {
    selectedCategories.push(category);
  } else {
    const index = selectedCategories.indexOf(category);
    if (index !== -1) {
      selectedCategories.splice(index, 1);
    }
  }
  console.log(selectedCategories);

  if (selectedCategories.length === 0) {
    handleNoSelectedCategories();
  }
  
  // 카테고리 변경 시 이미지 필터링 및 보여주기
  filterAndShowImages();
});

// 2. 이미지 필터링 및 보여주기 함수
function filterAndShowImages() {
  $('.img-wrapper').each(function() {
    const dataIndex = $(this).data('index');
 // 이미지 데이터 배열에서 선택된 카테고리에 해당하는 이미지 필터링
    const filteredImages = imageDataArray.filter(imageData => {
      return selectedCategories.includes(imageData.format);
    });
    
    // 이미지 데이터 배열에 있는 이미지와 img-wrapper의 data-index 비교하여 보여주기
    if (filteredImages.some(imageData => imageData.dataIndex === dataIndex)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

function handleNoSelectedCategories() {
  // 페이지를 한 번만 새로고침
  if (!localStorage.getItem('pageReloaded')) {
    localStorage.setItem('pageReloaded', 'true');
    location.reload();
  }
}

// 페이지 로드 시 선택된 카테고리 확인
$(document).ready(function() {
  if (selectedCategories.length === 0) {
    handleNoSelectedCategories();
  }
});