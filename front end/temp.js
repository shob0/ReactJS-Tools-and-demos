importPackage(Packages.com.tivoli.am.fim.trustserver.sts);
importPackage(Packages.com.tivoli.am.fim.trustserver.sts.uuser);
importClass(Packages.com.tivoli.am.fim.trustserver.sts.utilities.IDMappingExtUtils);
importClass(Packages.com.tivoli.am.fim.trustserver.sts.utilities.OAuthMappingExtUtils);
importClass(Packages.com.ibm.security.access.httpclient.HttpClient);
importClass(Packages.com.ibm.security.access.httpclient.HttpResponse);
importClass(Packages.com.ibm.security.access.httpclient.Headers);
importClass(Packages.com.ibm.security.access.httpclient.Parameters);
importClass(Packages.java.util.ArrayList);
importClass(Packages.java.util.HashMap);
importClass(Packages.java.lang.System);



/**
 * function to print the message passed as a param
 * @param {msg} msg 
 */
function trace(msg) {
  IDMappingExtUtils.traceString("\n\nJWT OAUTH AT:\n" + msg + "\n");
}



function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null
}

/* 
* The following two variables are declared to work around assumptions in included libraries that think we are running in a browser
*/
var navigator = { "appName": null, "appVersion": null };
var window = { "crypto": undefined };

/**
 * Function to replace string in the incoming string input
 * @param {*} a 
 */
function newline_toDos(inputString) {
  trace('Before Replacong the characters in newline_toDocs: ' + inputString);
  inputString = inputString.replace(/\r\n/mg, "\n");
  inputString = inputString.replace(/\n/mg, "\r\n");
  trace('String after relacement: ' + inputString);
  return inputString;
}

/**
 *Making safe JSON from String
 */

function readSafeJSONString(inputString) {
  var c = null;
  try {
    c = jsonParse(inputString);
    if (typeof c != "object") {
      trace("Parsing failed. Error in input string");
      return null;
    }
    if (c.constructor === Array) {
      trace("Parsing failed. Error in input Input tring is an array");
      return null;
    }
    trace("Input String parsed Successfully");
    return c;
  } catch (ex) {
    trace("Parsing failed. Error in input string" + ex);
    return null;
  }
};


trace("STSUU before entering into mapping scipt" + stsuu.toString());

/**
 * Generate JWS to be used fot JWT
 * @param {*} payload 
 */
function generateJWS(payload) {
  var sHead = newline_toDos('{"alg":"RS256"}');
  var head = readSafeJSONString(sHead);
  var sPayload = newline_toDos(payload);
  var hN = "a1f8160ae2e3c9b465ce8d2d656263362b927dbe29e1f02477fc1625cc90a136e38bd93497c5b6ea63dd7711e67c7429f956b0fb8a8f089adc4b69893cc1333f53edd019b87784252fec914fe4857769594bea4280d32c0f55bf62944f130396bc6e9bdf6ebdd2bda3678eeca0c668f701b38dbffb38c8342ce2fe6d27fade4a5a4874979dd4b9cf9adec4c75b05852c2c0f5ef8a5c1750392f944e8ed64c110c6b647609aa4783aeb9c6c9ad755313050638b83665c6f6f7a82a396702a1f641b82d3ebf2392219491fb686872c5716f50af8358d9a8b9d17c340728f7f87d89a18d8fcab67ad84590c2ecf759339363c07034d6f606f9e21e05456cae5e9a1";
  var hE = "010001";
  var hD = "12ae71a469cd0a2bc37e526c4500571f1d61751d64e949707b62590f9d0ba57c963c401e3fcf2f2cd3bdec88e503bfc6439b0b28c82f7d3797671f5213eed8c15a25d8d5cea0025ee3ab2e8b7f79216fc63bea562753b40644c6a15127d9b2954540a0bbe1a30556982d4e9fde5f6425f14d4b713441b55dc73b9b4aedcc92ace3927e37f57d0cfd5e7581fa512c8f4961a9eb0b80f8a80746728a55ff46471f3425063b9d53642f5ede1e84d613081afa5c22d051285bd63b943b565d898a05685413e53c3c6c6525ff1fe34e3ddc70f0d56450fda48ba12e104e9deb9fb81881e1c4bdf25d9247f450c865927968e77334f4414f75a750e139546e3a8a739d";
  var sResult = null;
  var prv;
  try {
    if (hN.match(/^[8-9,a-f]/)) hN = "00" + hN;
    prv = KEYUTIL.getKey({ n: hN, e: hE, d: hD });
    sResult = KJUR.jws.JWS.sign(head.alg, sHead, sPayload, prv);
    trace()
    return sResult;
  } catch (ex) {
    trace(ex);
  }
}

/**
 * Collect all the required info creating token
 */
function generateCustomAccessTokenString(state_id, username, access_token) {
  var client_id = stsuu.getContextAttributes().getAttributeValueByName("client_id");
  var scopeStringArray = stsuu.getContextAttributes().getAttributeValuesByName("scope");
  trace("stateID: " + state_id);
  trace("username: " + username);
  trace("client_id: " + "----" + client_id);
  trace("access_token: " + "----" + access_token);
  trace("cliscopeStringArrayent_id: " + scopeStringArray);
  var expiresInSeconds = parseInt(stsuu.getContextAttributes().getAttributeValueByName("expires_in"));
  trace("The session Expires in: " + expiresInSeconds);
  // var payload = { "iss": "www.upc.ch","exp": expiresInSeconds +', "sub": ' + username +  ' ,"customerInfo":   state_id  ,"customerToken": access_token  };
  var payload = { "iss": "www.upc.ch", "exp": 1345321, "sub": username + "", "customerInfo": state_id + "", "customerToken": access_token + "" };
  trace(payload);
  var payloadJSON = JSON.stringify(payload);
  trace("Payload before generating the token: " + payloadJSON);
  var jwtToken = generateJWS(payloadJSON);
  trace("jwtTOKEN :" + jwtToken);
  return jwtToken;
}


var issueJWT = true;
if (issueJWT) {
  var request_type = stsuu.getContextAttributes().getAttributeValueByName("request_type");
  var grant_type = stsuu.getContextAttributes().getAttributeValueByName("grant_type");
  var state_id = stsuu.getContextAttributes().getAttributeValueByName("state_id");

  trace('request_type' + ":" + request_type);
  trace('grant_type' + ":" + grant_type);
  trace('state_id' + ":" + state_id)


  var username = null;
  if (request_type != null && request_type.equals("authorization")) {
    username = stsuu.getContextAttributes().getAttributeValueByNameAndType("username", "urn:ibm:names:ITFIM:oauth:request");
  } else if (request_type != null && request_type.equals("access_token")) {
    if (grant_type != null && grant_type.equals("authorization_code")) {
      username = stsuu.getContextAttributes().getAttributeValueByNameAndType(
        "username", "urn:ibm:names:ITFIM:oauth:body:param");
    } else if (grant_type != null && grant_type.equals("password")) {
      username = stsuu.getContextAttributes().getAttributeValueByNameAndType(
        "username", "urn:ibm:names:ITFIM:oauth:body:param");
    } else if (grant_type != null && grant_type.equals("client_credentials")) {
      username = stsuu.getContextAttributes().getAttributeValueByNameAndType(
        "client_id", "urn:ibm:names:ITFIM:oauth:body:param");
    }
  }
  if (username != null) {
    OAuthMappingExtUtils.associate(state_id, "username", username);
  } else {
    username = OAuthMappingExtUtils.getAssociation(state_id, "username");
  }
  trace("The username from the call: " + username);

  var access_token_id = null;
  // access_token_id
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType(
    "access_token_id", "urn:ibm:names:ITFIM:oauth:response:metadata");
  if (temp_attr != null && temp_attr.length > 0) {
    access_token_id = temp_attr[0];
  }

  trace("access_token_id" + access_token_id);

  if (access_token_id != null) {
    var customATString = generateCustomAccessTokenString(state_id, username, access_token_id);
    stsuu.getContextAttributes().removeAttributeByNameAndType(
      "access_token", "urn:ibm:names:ITFIM:oauth:response:attribute");
    var a = new com.tivoli.am.fim.trustserver.sts.uuser.Attribute(
      "access_token",
      "urn:ibm:names:ITFIM:oauth:response:attribute",
      customATString);
    stsuu.getContextAttributes().setAttribute(a);
  }


}







/**
 * This mapping rule shows 2 examples: the Client Credentials scenario and HTTP
 * Client demo.
 */

var updateRedirectURI = false;

if (updateRedirectURI) {

  IDMappingExtUtils.traceString("Testapp mapping rules before updating location header: " + stsuu.toString());

  var hostname = "http://localhost:8383";
  var state_id = null;
  var request_type = null;

  // The state id handle
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("state_id", "urn:ibm:names:ITFIM:oauth:state");
  if (temp_attr != null && temp_attr.length > 0) {
    state_id = temp_attr[0];
  }
  // The request type - if none available assume 'resource'
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("request_type", "urn:ibm:names:ITFIM:oauth:request");
  if (temp_attr != null && temp_attr.length > 0) {
    request_type = temp_attr[0];
  }
  else {
    request_type = "resource";
  }
  var state_param = null;
  var redirect_uri = null;

  IDMappingExtUtils.traceString("Request type to update the redirect URI" + request_type);
  if (request_type == "authorization" || request_type == "token") {
    //Update Redirect URI in response
    temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("state", "urn:ibm:names:ITFIM:oauth:query:param");
    if (temp_attr != null && temp_attr.length > 0) {
      state_param = temp_attr[0];
    }
    IDMappingExtUtils.traceString("state parameter from the request" + state_param);

    temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("redirect_uri", "urn:ibm:names:ITFIM:oauth:query:param");
    if (temp_attr != null && temp_attr.length > 0) {
      redirect_uri = temp_attr[0];
    }
    IDMappingExtUtils.traceString("Redirect URI recieved for the request" + redirect_uri);

    IDMappingExtUtils.traceString("Removed Attribute redirect_uri.");
    stsuu.getContextAttributes().removeAttributeByNameAndType("redirect_uri", "urn:ibm:names:ITFIM:oauth:query:param");

    var language = state_param.split("_")[2];
    IDMappingExtUtils.traceString("Language: " + language);

    var redirect_url_arr = redirect_uri.split(hostname);
    var updated_redirect_uri = hostname + "/" + language + redirect_url_arr[1];

    IDMappingExtUtils.traceString("Redirect uri after adding the language code: " + updated_redirect_uri);

    stsuu.addContextAttribute(new Attribute("redirect_uri", "urn:ibm:names:ITFIM:oauth:query:param", updated_redirect_uri));
    IDMappingExtUtils.traceString("Testapp mapping rules after upating location header: " + stsuu.toString());
  }
}



/** 
 * This is an example of how you could do attribute association with a given
 * state ID for the Client Credentials scenario.
 * 
 * To enable this demo, change the "cc_demo" variable to "true".
 */

var cc_demo = false;

if (cc_demo) {

  var state_id = null;
  var request_type = null;
  var grant_type = null;
  var temp_attr = null;

  // The state id handle
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("state_id", "urn:ibm:names:ITFIM:oauth:state");
  if (temp_attr != null && temp_attr.length > 0) {
    state_id = temp_attr[0];
  }

  // The request type - if none available assume 'resource'
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("request_type", "urn:ibm:names:ITFIM:oauth:request");
  if (temp_attr != null && temp_attr.length > 0) {
    request_type = temp_attr[0];
  } else {
    request_type = "resource";
  }

  // The grant type
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("grant_type", "urn:ibm:names:ITFIM:oauth:body:param");
  if (temp_attr != null && temp_attr.length > 0) {
    grant_type = temp_attr[0];
  }

  if (request_type == "access_token" && grant_type == "client_credentials" && state_id != null) {

    /* Manipulate extra attributes */

    // Associate an extra attribute key-value pair to the authorization
    // grant
    OAuthMappingExtUtils.associate(state_id, "special_id", "sp_" + state_id);

    // Get the extra attribute keys of all extra attributes associated with
    // the authorization grant
    var attrKeyArray = OAuthMappingExtUtils.getAssociationKeys(state_id);
    if (attrKeyArray != null) {
      // Disassociate an extra attribute
      OAuthMappingExtUtils.disassociate(state_id, "special_id");
      // Associate another extra attribute
      OAuthMappingExtUtils.associate(state_id, "friendly_name", "phone client");
    }

    // Put extra attributes into stsuu context attributes
    attrKeyArray = OAuthMappingExtUtils.getAssociationKeys(state_id);
    if (attrKeyArray != null) {
      for (var i = 0; i < attrKeyArray.length; i++) {
        stsuu.addContextAttribute(new Attribute(attrKeyArray[i], "urn:ibm:names:ITFIM:oauth:response:attribute", OAuthMappingExtUtils.getAssociation(state_id, attrKeyArray[i])));
      }
    }
  }
}

/**
 * The following is a HTTP Client example.
 * 
 * This is an example of how you could do use the HTTP client to do HTTP GET and
 * POST requests.
 * 
 * To enable this demo, change the "httpclient_demo" variable to "true" and make
 * the appropriate modifications to the host name and other parameters of the
 * httpGet and httpPost methods.
 */

var httpclient_demo = false;

if (httpclient_demo) {

  /* HttpClient */
  var hr = new HttpResponse();
  var headers = new Headers();
  var params = new Parameters();
  headers.addHeader("x-header-1", "header_value");
  params.addParameter("param1", "param1_value");

	/**
	 * Minimal HTTP GET and POST
	 */

  // httpGet(String url)
  hr = HttpClient.httpGet("http://yourHostName/");

  if (hr != null) {
    IDMappingExtUtils.traceString("code: " + hr.getCode()); // output to
    // trace
    IDMappingExtUtils.traceString("body: " + hr.getBody());
    var headerKeys = hr.getHeaderKeys();
    if (headerKeys != null) {
      for (var i = 0; i < headerKeys.length; i++) {
        var headerValues = hr.getHeaderValues(headerKeys[i]);
        for (var j = 0; j < headerValues.length; j++) {
          IDMappingExtUtils.traceString("header: " + headerKeys[i] + "=" + headerValues[j]);
        }
      }
    }
  }

  // httpPost(String url, Map parameters)
  hr = HttpClient.httpPost("http://yourHostName/", params);
  if (hr != null) {
    IDMappingExtUtils.traceString("code: " + hr.getCode());
    IDMappingExtUtils.traceString("body: " + hr.getBody());
    headerKeys = hr.getHeaderKeys();
    if (headerKeys != null) {
      for (var i = 0; i < headerKeys.length; i++) {
        var headerValues = hr.getHeaderValues(headerKeys[i]);
        for (var j = 0; j < headerValues.length; j++) {
          IDMappingExtUtils.traceString("header: " + headerKeys[i] + "=" + headerValues[j]);
        }
      }
    }
  }

	/**
	 * HTTPS vs HTTP
	 * 
	 * For HTTPS, using the minimal httpGet and httpPost methods will assume the
	 * default trust store (util.httpClient.defaultTrustStore in Advanced
	 * Configuration panel). Alternatively, you can use the full httpGet and
	 * httpPost methods to specify the connection parameters, giving null to any
	 * field that is not required.
	 */

	/**
	 * httpGet(String url, Map headers, String httpsTrustStore, String
	 * basicAuthUsername,String basicAuthPassword, String clientKeyStore,String
	 * clientKeyAlias);
	 */
  hr = HttpClient.httpGet("https://yourHostName/", null, null, "admin", "password", null, null);
  if (hr != null) {
    // output to trace
    IDMappingExtUtils.traceString("code: " + hr.getCode());
    IDMappingExtUtils.traceString("body: " + hr.getBody());
    headerKeys = hr.getHeaderKeys();
    if (headerKeys != null) {
      for (var i = 0; i < headerKeys.length; i++) {
        var headerValues = hr.getHeaderValues(headerKeys[i]);
        for (var j = 0; j < headerValues.length; j++) {
          IDMappingExtUtils.traceString("header: " + headerKeys[i] + "=" + headerValues[j]);
        }
      }
    }
  }

	/**
	 * httpPost(String url, Map headers, Map parameters,String httpsTrustStore,
	 * String basicAuthUsername,String basicAuthPassword, String
	 * clientKeyStore,String clientKeyAlias);
	 */
  hr = HttpClient.httpPost("https://yourHostName/", null, params, null, null, null, "client_keystore", "myKeyAlias");
  if (hr != null) {
    IDMappingExtUtils.traceString("code: " + hr.getCode());
    IDMappingExtUtils.traceString("body: " + hr.getBody());
    headerKeys = hr.getHeaderKeys();
    if (headerKeys != null) {
      for (var i = 0; i < headerKeys.length; i++) {
        var headerValues = hr.getHeaderValues(headerKeys[i]);
        for (var j = 0; j < headerValues.length; j++) {
          IDMappingExtUtils.traceString("header: " + headerKeys[i] + "=" + headerValues[j]);
        }
      }
    }
  }
}

/** Delete Token from cache
 * This is an example of how you could do delete a token from the cache given the token ID
 * 
 * To enable this demo, change the "deleteToken_demo" variable to "true".
 */

var deleteToken_demo = false;

if (deleteToken_demo) {
  var request_type = null;
  var grant_type = null;
  var access_token_id = null;
  var refresh_token_id = null;
  var temp_attr = null;

  //request type
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("request_type", "urn:ibm:names:ITFIM:oauth:request");
  if (temp_attr != null && temp_attr.length > 0) {
    request_type = temp_attr[0];
  } else {
    request_type = "resource";
  }

  // The grant type
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("grant_type", "urn:ibm:names:ITFIM:oauth:body:param");
  if (temp_attr != null && temp_attr.length > 0) {
    grant_type = temp_attr[0];
  }

  //access_token_id
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("access_token_id", "urn:ibm:names:ITFIM:oauth:response:metadata");
  if (temp_attr != null && temp_attr.length > 0) {
    access_token_id = temp_attr[0];
  }

  //refresh_token_id
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("refresh_token_id", "urn:ibm:names:ITFIM:oauth:response:metadata");
  if (temp_attr != null && temp_attr.length > 0) {
    refresh_token_id = temp_attr[0];
  }

  // Delete Token Scenario when request_type is access token and grant type is password.
  if (request_type == "access_token" && grant_type == "password") {
    if (access_token_id != null) {
      OAuthMappingExtUtils.deleteToken(access_token_id);
    }

    if (refresh_token_id != null) {
      OAuthMappingExtUtils.deleteToken(refresh_token_id);
    }
  }
}

var injectcustomerid = false;

if (injectcustomerid) {

  var state_id = null;
  var request_type = null;
  var is_authorized = false;
  var customerId = null;
  var customerStatus = null;

  // The state id handle
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("state_id", "urn:ibm:names:ITFIM:oauth:state");
  if (temp_attr != null && temp_attr.length > 0) {
    state_id = temp_attr[0];
  }
  // The request type - if none available assume 'resource'
  temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("request_type", "urn:ibm:names:ITFIM:oauth:request");
  if (temp_attr != null && temp_attr.length > 0) {
    request_type = temp_attr[0];
  }
  else {
    request_type = "resource";
  }

  // If request_type = authorization, associate additional attributes from TAM credential 
  if (request_type == "authorization" || request_type == "token") {
    //Update Redirect URI in response



    var customerId = stsuu.getAttributeValueByName("tagvalue_credattrs_xcontact");
    var countryCode = stsuu.getAttributeValueByName("tagvalue_credattrs_country");
    var fixedCustId = stsuu.getAttributeValueByName("tagvalue_credattrs_fixedCustId");
    var mobileCustId = stsuu.getAttributeValueByName("tagvalue_credattrs_mobileCustId");

    if (customerId != null) {
      OAuthMappingExtUtils.associate(state_id, "customerid", customerId);
    }
    if (countryCode != null) {
      OAuthMappingExtUtils.associate(state_id, "countrycode", countryCode);
    }
    if (fixedCustId != null) {
      OAuthMappingExtUtils.associate(state_id, "fixedCustId", fixedCustId);
    }
    if (mobileCustId != null) {
      OAuthMappingExtUtils.associate(state_id, "mobileCustId", mobileCustId);
    }

    // OAuthMappingExtUtils.associate(state_id, "stateId", state_id);
  }

  // Put extra attributes into stsuu context attributes
  if (request_type == "resource") {
    // The authorization decision
    temp_attr = stsuu.getContextAttributes().getAttributeValuesByNameAndType("authorized", "urn:ibm:names:ITFIM:oauth:response:decision");
    if (temp_attr[0] == "true" || temp_attr[0] == "TRUE") {
      is_authorized = true;
      var ca_customerid = OAuthMappingExtUtils.getAssociation(state_id, "customerid");
      var ca_countrycode = OAuthMappingExtUtils.getAssociation(state_id, "countrycode");
      var ca_fixedCustId = OAuthMappingExtUtils.getAssociation(state_id, "fixedCustId");
      var ca_mobileCustId = OAuthMappingExtUtils.getAssociation(state_id, "mobileCustId");
      // var ca_stateId = OAuthMappingExtUtils.getAssociation(state_id, "stateId");
      if (ca_customerid != null) {
        if (ca_customerid == "-") {

          stsuu.addContextAttribute(new Attribute("customerid", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        } else {
          stsuu.addContextAttribute(new Attribute("customerid", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_customerid));
        }
        if ((ca_fixedCustId == null) || (ca_fixedCustId == "-")) {
          stsuu.addContextAttribute(new Attribute("fixedCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        } else {
          stsuu.addContextAttribute(new Attribute("fixedCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_fixedCustId));
        }
        if ((ca_mobileCustId == null) || (ca_mobileCustId == "-")) {
          stsuu.addContextAttribute(new Attribute("mobileCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        } else {
          stsuu.addContextAttribute(new Attribute("mobileCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_mobileCustId));
        }
      } else if (ca_customerid == null) {
        stsuu.addContextAttribute(new Attribute("customerid", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        if ((ca_fixedCustId == null) || (ca_fixedCustId == "-")) {
          stsuu.addContextAttribute(new Attribute("fixedCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        } else {
          stsuu.addContextAttribute(new Attribute("fixedCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_fixedCustId));
        }
        if ((ca_mobileCustId == null) || (ca_mobileCustId == "-")) {
          stsuu.addContextAttribute(new Attribute("mobileCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", "NOT_AVAILABLE"));
        } else {
          stsuu.addContextAttribute(new Attribute("mobileCustId", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_mobileCustId));
        }
      }

      if (ca_countrycode != null) {
        stsuu.addContextAttribute(new Attribute("countrycode", "urn:ibm:names:ITFIM:oauth:response:attribute", ca_countrycode));

      }

      stsuu.addContextAttribute(new Attribute("stateid", "urn:ibm:names:ITFIM:oauth:response:attribute", state_id));

      stsuu.addContextAttribute(new Attribute("tagvalue_always", "urn:ibm:names:ITFIM:oauth:response:attribute", "customerid,countrycode,fixedCustId,mobileCustId,stateid"));

    }
  }
}

