// 解锁手机屏幕
function unLock() {
  if (!device.isScreenOn()) {
    device.wakeUp();
    sleep(500);
    swipe(500, 2000, 500, 1000, 200);
    sleep(500);
    const password = "123456"; //这里换成自己的手机解锁密码
    for (let i = 0; i < password.length; i++) {
      let position = text(password[i]).findOne().bounds();
      click(position.centerX(), position.centerY());
      sleep(100);
    }
  }
  sleep(1000);
}

//抢菜流程
function robVeg() {
  unLock();
  launchApp("美团买菜");
  waitForPackage("com.meituan.retail.v.android", 200);
  auto.waitFor();
  const btn_skip = id("btn_skip").findOne();
  if (btn_skip) {
    btn_skip.click();
    toast("已跳过首屏广告");
  }
  sleep(2000);
  gotoBuyCar();
  sleep(2000);
  checkAll();
  sleep(2000);
  submitOrder(0);
}

robVeg();

//打开购物车页面
function gotoBuyCar() {
  if (id("img_shopping_cart").exists()) {
    id("img_shopping_cart").findOne().parent().click();
    toast("已进入购物车");
  } else {
    toast("没找到购物车");
    exit;
  }
}

//勾选全部商品
function checkAll() {
  const isCheckedAll = textStartsWith("结算(").exists();
  const checkAllBtn = text("全选").findOne();
  if (!!checkAllBtn) {
    !isCheckedAll && checkAllBtn.parent().click();
    sleep(1000);
  } else {
    toast("没找到全选按钮");
    exit;
  }
}

function submitOrder(count) {
  if (textStartsWith("结算(").exists()) {
    textStartsWith("结算(").findOne().parent().click();
  } else if (text("我知道了").exists()) {
    toast("关闭我知道了");
    text("我知道了").findOne().parent().click();
  } else if (text("重新加载").exists()) {
    toast("重新加载");
    text("重新加载").findOne().parent().click();
  } else if (text("立即支付").exists()) {
    text("立即支付").findOne().parent().click();
  } else if (text("确认支付").exists()) {
    const music =
      "/storage/emulated/0/netease/cloudmusic/Music/Joel Hanson Sara Groves - Traveling Light.mp3";
    media.playMusic(music);
    sleep(media.getMusicDuration());
  } else {
    toast("抢个屁！");
    exit;
  }
  sleep(800);
  if (count > 10000) {
    toast("没抢到");
    exit;
  }

  submitOrder(count++);
}
