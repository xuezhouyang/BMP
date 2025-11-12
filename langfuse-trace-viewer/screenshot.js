const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();

  // 设置视口大小
  await page.setViewportSize({ width: 1600, height: 1200 });

  try {
    // 访问本地服务器
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });

    // 等待页面加载完成
    await page.waitForTimeout(2000);

    // 截取视口内容
    await page.screenshot({ path: 'screenshot-viewport.png' });
    console.log('Viewport screenshot saved to screenshot-viewport.png');

    // 点击第一个观察节点
    const firstNode = await page.$('.observation-node');
    if (firstNode) {
      await firstNode.click();
      await page.waitForTimeout(1000);

      // 截取点击后的状态
      await page.screenshot({ path: 'screenshot-selected.png' });
      console.log('Selected node screenshot saved to screenshot-selected.png');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
