import { Selector, ClientFunction } from "testcafe";
import uaParser from "ua-parser-js";
const getWindowLocation = ClientFunction(() => window.location);
const performAsyncOperation = ClientFunction(() => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 500); // some async operations
  });
});
const getLocationPart = ClientFunction((key) => {
  return window.location[key];
});

fixture`Primer Intento De Cafeto`
  .page`http://devexpress.github.io/testcafe/example`;

test("Mi Primer inteot", async (t) => {
  await t
    .typeText("#developer-name", "Hector Lopez")
    .click("#submit-button")
    .expect(Selector("#article-header").innerText)
    .eql("Thank you, Hector Lopez!");
});

test("Llenar CheckBox", async (t) => {
  const checBoxesList = [
    "#remote-testing",
    "#reusing-js-code",
    "#background-parallel-testing",
    "#continuous-integration-embedding",
    "#traffic-markup-analysis",
  ];

  for (var i = 0; i < checBoxesList.length; i++) {
    const checkbox = Selector(checBoxesList[i]);
    await t.click(checkbox).expect(checkbox.checked).ok();
  }
});

test("Drag El SideBar", async (t) => {
  const selectorLabel = Selector("label").withText("I have tried TestCafe");
  await t
    .click(selectorLabel)
    .drag("#slider", 360, 0, { offsetX: 10, offsetY: 10 });
});

/* test.page`https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileUploader/FileSelection/jQuery/Light/`(
  "Testing Upload Of A File",
  async (t) => {
    await t
      .switchToIframe(".demo-frame")
      .setFilesToUpload(".dx-fileuploader-input", [
        "/Users/hectorlopez/testingfolder/testincafegrapqlreactquery/assets/pibetest.jpeg",
      ]);
  }
);
 */
test.page`https://www.google.com`(
  "Tomar pantallazo de la pagina de google",
  async (t) => {
    await t.takeScreenshot();
  }
);

test.page`http://devexpress.github.io/testcafe/example`(
  "Haciendo assertiones",
  async (t) => {
    const developerNameInput = Selector("#developer-name");

    await t
      .expect(developerNameInput.value)
      .eql("", "input is empty")
      .typeText(developerNameInput, "Peter Parker")
      .expect(developerNameInput.value)
      .contains("Peter", 'input contains text "Peter"');
  }
);

test.page`https://devexpress.github.io/testcafe/example/`(
  "Validating Correct URL",
  async (t) => {
    await t
      .expect(getLocationPart("host"))
      .eql("devexpress.github.io")
      .expect(getLocationPart("pathname"))
      .eql("/testcafe/example/");
  }
);

test.page`https://www.facebook.com`(
  "hacerle resize a la pantalla",
  async (t) => {
    await t.resizeWindowToFitDevice("iphonexr").maximizeWindow();
  }
);

const getUA = ClientFunction(() => navigator.userAgent);

test.page`http://example.com`("Check User Agent", async (t) => {
  const ua = await getUA();
  const browserAlias = uaParser(ua).browser.name;

  //Some common actions

  //Conditional logic
  if (browserAlias === "Chrome") {
    //Test logic for Chrome
    console.log("The browser is Chrome");
  } else if (browserAlias === "Safari") {
    //Test logic for Safari
    console.log("The browser is Safari");
  }
});

//Advanced User for ClientFunctions - Complex Dom Queries
const getSalesAmount = ClientFunction(() => {
  const grid = document.querySelector(".dx-datagrid-rowsview");
  const rowCount = grid.querySelectorAll(".dx-data-row").length;
  const sales = grid.querySelectorAll("td:nth-child(3)");
  const customers = grid.querySelectorAll("td:nth-child(7)");

  const array = [];

  for (let i = 0; i < rowCount; i++) {
    array.push({
      sales: sales[i].textContent,
      customer: customers[i].textContent,
    });
  }

  return array;
});

test.page`https://js.devexpress.com/`("Complex Dom QUERY", async (t) => {
  await t.expect(getSalesAmount()).eql([
    { sales: "$6,370", customer: "Renewable Supplies" },
    { sales: "$4,530", customer: "Apollo Inc" },
    { sales: "$1,110", customer: "Johnson & Assoc" },
    { sales: "$6,600", customer: "Global Services" },
    { sales: "$2,830", customer: "Health Plus Inc" },
    { sales: "$6,770", customer: "Gemini Stores" },
    { sales: "$1,460", customer: "Discovery Systems" },
  ]);
});

test.page`http://127.0.0.1:3000/`("Checking localhOST", async (t) => {
  const ua = await getUA();
  const browserAlias = uaParser(ua).browser.name;

  //Some common actions

  //Conditional logic
  if (browserAlias === "Chrome") {
    //Test logic for Chrome
    console.log("The browser is Chrome");
  } else if (browserAlias === "Safari") {
    //Test logic for Safari
    console.log("The browser is Safari");
  }

  const subtotal = Selector("p").withText("Subtotal (4 items)");
  await t
    .expect(subtotal.textContent)
    .eql("Subtotal (4 items)")
    .expect(Selector("button", { visibilityCheck: false }).exists)
    .ok();
});
