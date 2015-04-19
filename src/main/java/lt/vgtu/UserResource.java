package lt.vgtu;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lt.vgtu.*;
import com.mongodb.client.MongoCollection;
import static lt.vgtu.App.db;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.util.JSON;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam; 
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import jdk.nashorn.internal.parser.JSONParser;
import org.bson.Document;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    private static Map<Integer, User> users = new HashMap<>();
    
    @POST
    public String createTest(String json) {
        db.getCollection("tests").insertOne(Document.parse(json));
        return json;
    }

    @GET
    public String getUsers() {
        return db.getCollection("tests").find(eq("subject", "Maths")).first().toJson();
    }
}
