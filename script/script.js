const fetchBtn = async() => {

    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
    showBtn(data.categories)
}
fetchBtn();

const showBtn = (data) => {

    const navBtnSection = document.getElementById('nav-btn')
    for( const item of data)
    {
      const btn = document.createElement('button');
      btn.innerText = item.category;
      btn.classList = 'btn hover:bg-[#FF1F3D] hover:text-white '
      navBtnSection.appendChild(btn);
    }
}


const fetchVideo = async() => {

    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    showVideo(data.videos)
}
fetchVideo();

const showVideo = (data) => {
     console.log(data)
    const videoSection = document.getElementById('video')
    for( const item of data)
    {
      const section = document.createElement('div');
      section.classList = 'card card-compact'
      section.innerHTML = `
      
  <figure class="h-[180px] relative">
    <img class="h-full object-cover w-full"
      src=${item.thumbnail}
      alt="Shoes" />
      ${item.others.posted_date ? `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1"> ${item.others.posted_date} </span> `: ""}
  </figure>
  <div class="py-2 flex gap-3 mt-3">
        <div class="w-[50px] h-[50px] ">
            <img class="w-full h-full rounded-full object-cover"  src="${item.authors[0].profile_picture}" alt="">
        </div>

        <div class="flex flex-col gap-2 ">
            <h3 class="text-xl font-bold">${item.title}</h3>
            <p class="flex items-center gap-2">${item.authors[0].profile_name} ${item.authors[0].verified === true ? `<img class="" src="assets/Group (1).png" alt="">` : ""}</p>
            <p>${item.others.views} views</p>
        </div>
  </div>

      `
     
      videoSection.appendChild(section);
    }
}