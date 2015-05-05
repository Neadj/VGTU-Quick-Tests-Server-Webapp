package lt.vgtu;

import java.util.HashMap;
import java.util.List;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;

public class RestClient {
	
	public String getUrlAsString (String url) {
		return ClientBuilder.newClient()//
        .target(url)
        .request()
        .get(String.class);
	}
}
