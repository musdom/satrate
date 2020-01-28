<script>
	import { onMount } from "svelte";
  import moment from "moment";
	
	let myr = 1;
	let sat = 1;
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
		myr = sat*satRate;
		myr = myr.toLocaleString('en-MY', { maximumFractionDigits: 2 });
	}
	
	function getSAT() {
		sat = myr/satRate;
		sat = sat.toLocaleString('en-MY', { maximumFractionDigits: 4 });
	}
</script>

<main>
  <label>
    MYR
    <input type=text bind:value={myr} on:input={getSAT} on:change={getSAT} min=0>
  </label>

  <label>
    SAT
    <input type=text bind:value={sat} on:input={getMYR} on:change={getMYR} min=0>
  </label>

  <p>
    1 MYR = { Math.floor(1/satRate) } satoshis<br/>
    Exchange rate from Luno, { elapsed }
  </p>
</main>
