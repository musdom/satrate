<script>
  import 'bulma/css/bulma.css';
	import { onMount } from "svelte";
  import moment from "moment";
	
	let myr = 1;
  let myrDisp = "";
	let sat = 1;
  let satDisp = "";
	let satRate = null;
  let elapsed = "";
	
  onMount(async () => {
    let res = await fetch("/api/rate");
    let resObj = await res.text();
    resObj = JSON.parse(resObj);
    console.log(resObj);
    satRate = Number(resObj.last_trade)/1e8;
    getSAT();
    setInterval(() => {
      elapsed = moment(resObj.timestamp).fromNow();
    }, 1000)
  });
	
	function getMYR() {
    if (typeof sat === 'undefined') return;
		myr = sat*satRate;
    separatorDisplay();
	}
	
	function getSAT() {
    if (typeof myr === 'undefined') return;
		sat = myr/satRate;
    separatorDisplay()
	}

  function separatorDisplay() {
    satDisp = sat.toLocaleString('en-MY', { maximumFractionDigits: 4 });
    myrDisp = myr.toLocaleString('en-MY', { maximumFractionDigits: 2 });
  }
</script>

<main>
  <section class="section is-medium">
    <div class="container">

      <div class="columns is-centered">
        <div class="column is-1">
          <label class="label has-text-white">MYR</label>
        </div>
        <div class="column is-4">
          <!-- <label class="label has-text-white">MYR</label> -->
          <input 
            class="input is-large" 
            type="number" 
            bind:value={myr} 
            on:input={getSAT} on:change={getSAT} 
            min=0
          />
        </div>

        <div class="column is-5">
          <!-- <label class="label has-text-white">MYR</label> -->
          <input 
            class="input is-large has-background-dark has-text-light" 
            type="text" 
            bind:value={myrDisp} 
            readonly
          />
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-1">
          <label class="label has-text-white">SAT</label>
        </div>

        <div class="column is-4">
          <!-- <label class="label has-text-white">SAT</label> -->
          <input 
            class="input is-large" 
            type="number" 
            bind:value={sat} 
            on:input={getMYR} on:change={getMYR} 
            min=0
          />
        </div>

        <div class="column is-5">
          <!-- <label class="label has-text-white">SAT</label> -->
          <input 
            class="input is-large has-background-dark has-text-light" 
            type="text" 
            bind:value={satDisp} 
            readonly
          />
        </div>

      </div>

      <div class="columns is-centered">
        <div class="column is-10">
          <p>Exchange rate from Luno, { elapsed }</p>
        </div>
      </div>

    </div>
  </section>

</main>

<style>
  main {
    min-height: 100vh;
    /* align-content: center;
    margin: 0 auto; */
    color: white;
  }
  /* .columns {
    border: 1px solid white
  } */
  /* html {
    background-color: hsl(258, 10%, 19%);
  } */
</style>