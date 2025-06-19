import{a as q,S as v,i as a}from"./assets/vendor-QQhsBNEi.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();const P="50843154-75a8c51af40c5c9efbd704511";async function m(t,o=499){const e=new URLSearchParams({key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}),{data:s}=await q(`https://pixabay.com/api/?${e}`);return!s.hits||s.hits.length===0?[]:s}const y=document.querySelector(".gallery");let n;function g(t){if(!t||t.length===0){c();return}const o=t.map(e=>`
         <li class="gallery-item">
                <a href="${e.largeImageURL}" class="gallery-link">
                    <img 
                        src="${e.webformatURL}" 
                        alt="${e.tags}"
                        class="gallery-image"

                    />
                </a>
                <ul class="gallery-info">
                    <li class="gallery-info-list-item">
                     <h3>Likes:</h3>
                     <p>${e.likes}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Views:</h3>
                        <p>${e.views}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Comments:</h3>
                        <p>${e.comments}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Downloads:</h3>
                        <p>${e.downloads}</p>
                    </li>
                </ul>
            </li>
        `).join("");y.insertAdjacentHTML("beforeend",o),n?n.refresh():n=new v(".gallery a",{captionsData:"alt",captionDelay:250}),t.length>=15&&S()}function R(){y.innerHTML="",n&&(n.destroy(),n=null),c()}const p=document.querySelector(".loader"),L=document.querySelector(".load");function b(){p.classList.remove("hidden")}function w(){p.classList.add("hidden")}function S(){L.classList.remove("hidden")}function c(){L.classList.add("hidden")}const $=document.querySelector(".form"),h=document.querySelector("input[name='search-text']");document.querySelector(".search");const d=document.querySelector(".load");let f="",l=1;$.addEventListener("submit",M);d.addEventListener("click",E);async function M(t){if(t.preventDefault(),!h.value.trim())return;f=h.value.trim(),l=1,R(),b(),c();try{const e=await m(f,l);if(e.hits.length===0){a.info({title:"No results",message:"Sorry, no images found. Try again!",position:"bottomRight"});return}g(e.hits),e.hits.length>=15&&e.totalHits>e.hits.length&&S()}catch(e){a.error({title:"Error",message:e.message,position:"bottomRight"})}finally{w()}}async function E(){l+=1,d.disabled=!0,b();try{const t=await m(f,l);g(t.hits);const o=document.querySelectorAll(".gallery-item");if(o.length>0){const e=o[0].getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}(t.hits.length<15||l*15>=t.totalHits)&&(c(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}))}catch(t){a.error({title:"Error",message:t.message,position:"bottomRight"})}finally{w(),d.disabled=!1}}
//# sourceMappingURL=index.js.map
