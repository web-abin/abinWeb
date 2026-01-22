(function () {
  let url = '//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback'
  let temp = 'BusuanziCallback_' + Math.floor(1099511627776 * Math.random())
  let newurl = url.replace('=BusuanziCallback', '=' + temp)

  var script = document.createElement('script');
  script.src = newurl; 
  document.head.appendChild(script);

  window[temp] = function(res) {
    let pvDom = document.getElementById('busuanzi_value_site_pv')
    let uvDom = document.getElementById('busuanzi_value_site_uv')

    pvDom.textContent = res.site_pv
    uvDom.textContent = res.site_uv
  }
})()