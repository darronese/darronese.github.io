<script lang="ts">
import Fa from "svelte-fa";
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
</script>
<!-- PAGES -->
<div class="flex flex-col md:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 sm:pt-0 text-center">
    <h1 class="font-bold text-8xl sm:text-9xl text-[#E5DCC5] pt-12 sm:pt-0">resume</h1>
    <div class="basis-auto sm:basis-2/3 p-6 text-center">
      <label class="btn btn-circle swap swap-rotate bg-[#4c4c47]">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox"/>
        <svg
          class="swap-off rounded-full fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <Fa icon={faBolt}/>
        </svg>
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
        </svg>
      </label>
    </div>
  </div>
  <div class="card object-contain basis-1/6 w-84 sm:basis-1/4 p-4 pb-24 sm:pt-30">
    <figure class="group transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-xl hover:border-4 hover:border-[#c14153]">
      <a href="https://drive.google.com/file/d/1jd2WKaapmU2YjLHcehOiUCtWwxAwMZgM/view?usp=share_link" target="_blank" rel="noreferrer noopener">
        <div class="tooltip">
          <img class="rounded-lg hover:scale-105" src="/darron_resume.png" alt="Resume"/>
          <div class="tooltip-content">
            <div class="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Click me!</div>
          </div>
        </div>
      </a>
    </figure>
    <div class="card-body items-center">
      <h2 class="card-title">
        CV
        <div class="badge bg-[#c14153]">Darron Approved</div>
      </h2>
      <div class="card-actions justify-center">
        <div class="badge badge-outline">Professional</div>
        <div class="btn badge badge-outline bg-[#34A853] rounded-xl hover:bg-[#247c3b] hover:rounded-md duration-500">
          <a href="https://drive.google.com/file/d/1jd2WKaapmU2YjLHcehOiUCtWwxAwMZgM/view?usp=share_link" target="_blank" rel="noreferrer noopener">
            <Fa icon={faGoogleDrive}/>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
