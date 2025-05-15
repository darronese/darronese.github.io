<script lang="ts">
import Fa from "svelte-fa";
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
</script>
<!-- PAGES -->
<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 pt-6 sm:pt-0 text-center">
    <h1 class="font-bold text-7xl text-[#E5DCC5] pt-12 sm:pt-0">resume</h1>
  </div>
  <div class="card object-contain basis-1/6 w-84 sm:basis-1/4 p-4 sm:pt-30">
    <figure class="group transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-xl hover:border-4 hover:border-[#c14153]">
      <a href="https://drive.google.com/file/d/1jd2WKaapmU2YjLHcehOiUCtWwxAwMZgM/view?usp=share_link" target="_blank" rel="noreferrer noopener">
        <img class="rounded-lg hover:scale-105" src="/darron_resume.png" alt="Resume"/>
      </a>
    </figure>
    <div class="card-body items-center">
      <h2 class="card-title">
        CV
        <div class="badge bg-[#c14153]">Darron Approved</div>
      </h2>
      <div class="card-actions justify-center">
        <div class="badge badge-outline">Professional</div>
        <div class="btn badge badge-outline bg-[#34A853]">
          <a href="https://drive.google.com/file/d/1jd2WKaapmU2YjLHcehOiUCtWwxAwMZgM/view?usp=share_link" target="_blank" rel="noreferrer noopener">
            <Fa icon={faGoogleDrive}/>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
