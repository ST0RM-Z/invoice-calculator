"use strict";

const calculateDiscount = (customer, subtotal) => {
  if (customer == "reg") {
    if (subtotal >= 100 && subtotal < 250) {
      return 0.1;
    } else if (subtotal >= 250 && subtotal < 500) {
      return 0.25;
    } else if (subtotal >= 500) {
      return 0.3;
    } else {
      return 0;
    }
  } else if (customer == "loyal") {
    return 0.3;
  } else if (customer == "honored") {
    if (subtotal < 500) {
      return 0.4;
    } else {
      return 0.5;
    }
  }
};
// -----------------------------CREATING DATE NOW FUNCTION AND VALIDATING RETURNING TODAY AS DATE ------------------------
const date_function = (e) => {
  const eventDate = $("#invoice_date").val();
  console.log(eventDate);

  var today = new Date();

  var dd = String(today.getDate()).padStart(2, "0");

  var mm = String(today.getMonth() + 1).padStart(2, "0"); //Jan is 0!
  var yyyy = today.getFullYear();

  if (eventDate == "") {
    today = mm + "/" + dd + "/" + yyyy;

    $("#invoice_date").val(today);
  } else {
    today = eventDate;
    $("#invoice_date").val(today);
  }
  return today;
};
const isValid = (e) => {};
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

$(document).ready((e) => {
  $("#calculate").click(() => {
    const customerType = $("#type").val();
    let subtotal = $("#subtotal").val();
    let invoice_date = $("invoice_date").val();

    subtotal = parseFloat(subtotal);
    if (isNaN(subtotal) || subtotal <= 0) {
      alert("Subtotal must be a number greater than zero.");
      $("#clear").click();
      $("#subtotal").focus();
      return;
    }
    // calling date function
    const date_format = date_function(invoice_date, due_date);
    console.log(date_format);
    // console.log(isValid(date_format));

    // ------------------------VALIDATING DATE AND ALERTING ON INVALID DATE ------------------------
    let date = new Date(date_format);
    var due_date = new Date(date_format);
    due_date.setDate(due_date.getDate() + 30);
    due_date = due_date.toLocaleDateString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    });
    console.log("date", date);
    // console.log("DATE", date);
    if (date === "Invalid Date") {
      alert("Please enter the date in MM/DD/YYYY format.");
      return;
    }

    console.log(date_format);
    // -----------------------------------INSERTING DUE DATE TO HTML -----------------------
    $("#due_date").val(due_date);

    const discountPercent = calculateDiscount(customerType, subtotal);
    const discountAmount = subtotal * discountPercent;
    const invoiceTotal = subtotal - discountAmount;

    $("#subtotal").val(subtotal.toFixed(2));
    $("#percent").val((discountPercent * 100).toFixed(2));
    $("#discount").val(discountAmount.toFixed(2));
    $("#total").val(invoiceTotal.toFixed(2));

    // set focus on type drop-down when done
    $("#type").focus();
  });

  $("#clear").click(() => {
    $("#type").val("reg");
    $("#subtotal").val("");
    $("#invoice_date").val("");
    $("#percent").val("");
    $("#discount").val("");
    $("#total").val("");
    $("#due_date").val("");

    // set focus on type drop-down when done
    $("#type").focus();
  });

  // set focus on type drop-down on initial load
  $("#type").focus();
});
