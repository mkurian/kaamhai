package org.kaamhai.bizlogic;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.http.client.ClientProtocolException;
import org.kaamhai.dao.IJobAdDAO;
import org.kaamhai.dao.JobAdDAOESClient;
import org.kaamhai.entity.JobAd;
import org.kaamhai.entity.Reference;
import org.kaamhai.service.IJobAdService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author mkurian
 *
 */
public class JobAdManager implements IJobAdService {
	private static Logger logger = LoggerFactory.getLogger(JobAdDAOESClient.class);
	
	IJobAdDAO dao;

	public JobAdManager() {
		dao = new JobAdDAOESClient();
	}

	public Response getById(String id) throws Exception {
		return Response.status(Status.OK).entity(dao.getById(id)).build();
	}

	public Response get() throws Exception {
		List<JobAd> jobAds = dao.get();
		return Response.status(Status.OK).entity(jobAds).build();
	}

	public Response search(String gender, String location, String city, String language,
			String category) throws ClientProtocolException, IOException,
			Exception {
		List<JobAd> jobAds = dao.search(gender,location, city, language, category);
		return Response.status(Status.OK).entity(jobAds).build();
	}

	public Response create(HttpServletRequest request,
			HttpHeaders headers, JobAd adToAdd) throws Exception {
		List<JobAd> ads = dao.searchByContact(adToAdd.getContactInfo(), adToAdd.getCategory());
		logger.info(ads == null ? "null" : ads.toString());
		if(ads != null && ads.size() > 0){
			JobAd adPresent = ads.get(0);
			adPresent.setRating(adPresent.getRating() + 1);
//			Reference ref = new Reference();
//			ref.setNote(adToAdd.getDescription());
//			adPresent.getReferences().add(ref);
			adToAdd = dao.update(adPresent, adPresent.getId());
			
		}else{
//			List<Reference> refs = new ArrayList<>();
//			Reference ref = new Reference();
//			ref.setNote(adToAdd.getDescription());
//			adToAdd.setReferences(refs);
			
			adToAdd.setRating(1);
			adToAdd = dao.create(adToAdd);
		}
		return Response.status(Status.OK).entity(adToAdd).build();
	}

	public Response update(String id, JobAd ad,
			HttpServletRequest request, HttpHeaders headers) throws Exception {
		ad = dao.update(ad, id);
		return Response.status(Status.OK).entity(ad).build();
	}

	@Override
	public Response searchString(String searchString) throws Exception {
		List<JobAd> jobAds = dao.search(searchString);
		return Response.status(Status.OK).entity(jobAds).build();
	}
}
