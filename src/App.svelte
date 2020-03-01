<script>
  import 'bulma/css/bulma.css';
	import { onMount } from "svelte";
  import moment from "moment";
	
	let myr = 1;
  let myrDisp = "";
	let sat = 1;
  let satDisp = "";
  let btcRate = null;
	let satRate = null;
  let elapsed = "";
  let donation = 200;
	
  onMount(async () => {
    let res = await fetch("/api/rate");
    let resObj = await res.json();
    // resObj = JSON.parse(resObj);
    console.log(resObj);
    btcRate = resObj.myr_price;
    satRate = btcRate/1e8;
    getSAT();
    elapsed = moment(resObj.timestamp).fromNow();
    setInterval(() => {
      elapsed = moment(resObj.timestamp).fromNow();
    }, 30000)
  });
	
	function getMYR() {
    if (typeof sat === 'undefined') return;
		myr = Number((sat*satRate).toFixed(2));
    separatorDisplay();
	}
	
	function getSAT() {
    if (typeof myr === 'undefined') return;
		sat = Number((myr/satRate).toFixed(0));
    separatorDisplay()
	}

  function separatorDisplay() {
    satDisp = sat.toLocaleString('en-MY', { maximumFractionDigits: 0 });
    myrDisp = myr.toLocaleString('en-MY', { maximumFractionDigits: 2 });
  }

</script>

<main>
  <section class="hero">
    <div class="hero-head">
      <div class="container">
      </div>
    </div>

    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">
          <div class="column is-10">
            <h1 class="title has-text-light">
              Satoshi? Apa tu?
            </h1>
            <h2 class="subtitle has-text-light">
              1 BTC = 100,000,000 satoshi {#if btcRate}= RM {btcRate}{/if}
            </h2>
          </div>
        </div>

        <div class="columns is-centered">
          <!-- <div class="column is-1">
            <label class="label has-text-white">MYR</label>
          </div> -->

          <div class="column is-5">
            <div class="field has-addons">
              <div class="control">
                <input type="button" class="button is-large has-background-dark has-text-light" value="MYR" disabled/>
              </div>
              <div class="control is-expanded">
                <input 
                  class="input is-large" 
                  type="number" 
                  bind:value={myr} 
                  on:input={getSAT} on:change={getSAT} 
                  min=0
                />
              </div>
            </div>
          </div>

          <div class="column is-5">
            <input 
              class="input is-medium has-background-dark has-text-light" 
              type="text" 
              bind:value={myrDisp} 
              readonly
            />
          </div>
        </div>

        <div class="columns is-centered">
          <!-- <div class="column is-1">
            <label class="label has-text-white">SAT</label>
          </div> -->

          <div class="column is-5">
            <div class="field has-addons">
              <div class="control">
                <input type="button" class="button is-large has-background-dark has-text-light" value="SAT" disabled/>
              </div>
              <div class="control is-expanded">
                <input 
                  class="input is-large" 
                  type="number" 
                  bind:value={sat} 
                  on:input={getMYR} on:change={getMYR} 
                  min=0
                />
              </div>
            </div>
          </div>

          <div class="column is-5">
            <input 
              class="input is-medium has-background-dark has-text-light" 
              type="text" 
              bind:value={satDisp} 
              readonly
            />
          </div>

        </div>
      </div>

      <div class="container" style="padding-top: 5vh">
        <div class="columns is-centered">
          <div class="column is-5">
            {#if btcRate}
              <p>
                Exchange rate from <a target="_blank" rel="noopener noreferrer" href="https://www.coingecko.com">CoinGecko</a>, { elapsed }<br/>
                <!-- Exchange rate from <a target="_blank" rel="noopener noreferrer" href="https://www.luno.com/trade/XBTMYR">Luno</a>, { elapsed }<br/> -->
              </p>
            {:else}
              <p>Fetching exchange rate...</p>
              <progress class="progress" max="100">15%</progress>
            {/if}
          </div>

          <div class="column is-5">

            <form method="POST" action="https://btcpayjungle.com/api/v1/invoices" class="btcpay-form btcpay-form--block">
              <div class="field has-addons">
                <div class="control">
                  <input class="input" type="number" name="price" value="0.2" step="0.01" min="0.01" />
                </div>
                <div class="control">
                  <input type="submit" class="submit button has-background-dark has-text-light" name="submit" value="Donate (RM)" />
                </div>
              </div>
                <input type="hidden" name="storeId" value="54fGsrKwLEKHHDJTTT35tujV37gfWiUQUPLDYWeN7bbR" />
                <input type="hidden" name="currency" value="MYR" />
            </form>
            
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
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
  a {
    border-bottom: 1px solid white;
    cursor: pointer;
    color: white;
    transition: all 0.2s ease;
  }
  a:hover {
    border-bottom: 1px solid #3273dc;
    color: white;
  }
  /* .donate-submit {
    width: fit-content;
  } */
  /* .btcpay-form { 
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    border: 1px solid white;
    border-radius: 4px;
  } 
  .btcpay-form--block { 
    flex-direction: column; 
  }  */

  /* .columns {
    border: 1px solid white
  } */
  /* html {
    background-color: hsl(258, 10%, 19%);
  } */
</style>