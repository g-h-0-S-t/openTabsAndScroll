javascript: (async ()=>{
  const count = parseInt(prompt("How many tabs do you want to open?", "10"), 10);
  if (isNaN(count) || count <= 0) {
    console.log("Invalid number. Operation cancelled.");
    return;
  }
  console.log("Processing", count, "tabs at high speed...");
  
  for (let i = 0; i < count; i++) {
    const windowName = "tab_" + Date.now() + "_" + i;
    console.log(`[${i+1}/${count}] Opening:`, windowName);
    const newTab = window.open(window.location.href, windowName);
    
    if (newTab) {
      try {
        newTab.focus();
        console.log(`[${i+1}/${count}] Focused:`, windowName);
      } catch(e) {
        console.log(`[${i+1}/${count}] Focus failed:`, windowName);
      }
      
      let scrollAttempts = 0;
      let scrollSuccess = false;
      const maxScrollAttempts = 15;
      const scrollInterval = 100;
      
      while (scrollAttempts < maxScrollAttempts && !scrollSuccess) {
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
        try {
          if (newTab.document && newTab.document.body) {
            newTab.scrollTo(0, newTab.document.body.scrollHeight);
            scrollSuccess = true;
            console.log(`[${i+1}/${count}] Scrolled:`, windowName, `(attempt ${scrollAttempts + 1})`);
          }
        } catch (e) {
          scrollAttempts++;
        }
      }
      
      if (!scrollSuccess) {
        console.log(`[${i+1}/${count}] Scroll failed after`, maxScrollAttempts, "attempts:", windowName);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        newTab.close();
        console.log(`[${i+1}/${count}] Closed:`, windowName);
      } catch(e) {
        console.log(`[${i+1}/${count}] Close failed:`, windowName);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      console.log(`[${i+1}/${count}] Failed to open:`, windowName);
    }
  }
  console.log("✓ All", count, "tabs processed!");
})();
