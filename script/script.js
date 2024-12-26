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
      section.innerHTML = `
      
  <figure>
    <img
      src=${item.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>

      `
     
      videoSection.appendChild(section);
    }
}