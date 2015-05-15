package lt.vgtu;

import lt.vgtu.resources.TestResource;
import lt.vgtu.resources.TeacherResource;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.bson.Document;

import org.glassfish.jersey.filter.LoggingFilter;

@ApplicationPath("/rest/")
public class App extends Application {
    @Override
    public Set<Class<?>> getClasses() {
    	Set<Class<?>> s = new HashSet<Class<?>>();
    	s.add(TestResource.class);
        s.add(TeacherResource.class);
    	s.add(LoggingFilter.class);
    	return s;
    }
    
    public static MongoDatabase db;
	static {
            MongoClient client = new MongoClient();
            db = client.getDatabase("vgtutests");
    }
}
