import request from 'supertest';
import '@babel/polyfill';
import app from './app';

describe ('api', () => {

  describe( 'GET /api/v1/lists', () => {
  	let lists;
    beforeEach(() => {
      lists = [
    {
        "id": 1558629197562,
        "title": "bucket list",
        "notes": [
            {
                "id": 1558629165846,
                "userTask": "go to africa",
                "complete": false
            },
            {
                "id": 1558629179201,
                "userTask": "learn music production",
                "complete": false
            },
            {
                "id": 1558629188527,
                "userTask": "get a job",
                "complete": false
            }
        ]
    },
    {
        "id": 1558629436428,
        "title": "books to read",
        "notes": [
            {
                "id": 1558629416536,
                "userTask": "refactoring code",
                "complete": false
            },
            {
                "id": 1558629434028,
                "userTask": "long walk to freedom",
                "complete": false
            }
        ]
    }

]
    
	app.locals.lists = lists;
    })
    it ('should have a response status of 200', async () => {
    	const response = await request(app).get('/api/v1/lists');
    	expect (response.status).toBe(200);

    })

    it ('should return an array of lists', async () => {
    	const response = await request(app).get('/api/v1/lists');
    	expect(response.body).toEqual(lists);

    })

  } )

  describe ('GET /api/v1/lists/:id', () => {
  	it('should have a response status of 200', async () => {
  		const response = await request(app).get('/api/v1/lists/1558629436428');
  		expect(response.status).toBe(200);
  	})

  	it ('should have a response status of 404 if list not found', async () => {
  		const response = await request(app).get('/api/v1/lists/1558629436429')
  		expect(response.status).toBe(404)
  	})

  	it ('should return matching note with the id being passed in', async () => {
  		const response = await request(app).get('/api/v1/lists/1558629436428');
  		const expected = {
        "id": 1558629436428,
        "title": "books to read",
        "notes": [
            {
                "id": 1558629416536,
                "userTask": "refactoring code",
                "complete": false
            },
            {
                "id": 1558629434028,
                "userTask": "long walk to freedom",
                "complete": false
            }
        ]
    };
  		expect (response.body).toEqual(expected);
  	})
  })

  describe ('POST /api/v1/lists',  () => {
  	it('should have a status code of 201 on successful post', async () => {
  		//setup
  		const goodList = {
        "title": "bucket list",
        "notes": [
            {
                "id": 1558629165846,
                "userTask": "go to africa",
                "complete": false
            },
            {
                "id": 1558629179201,
                "userTask": "learn music production",
                "complete": false
            },
            {
                "id": 1558629188527,
                "userTask": "get a job",
                "complete": false
            }
        ]
    }
    	Date.now = jest.fn().mockImplementation(() => 20);
    	expect(app.locals.lists.length).toBe(2);
  		//execution
  		const response = await request(app).post('/api/v1/lists').send(goodList);
  		//expectation
  		expect (response.status).toBe(201);
  		expect(response.body).toEqual({id:20, ...goodList});
  	})

  	it ('should have status of 422 and error if the info send is not ok', async () => {
  		const badList = {"title": "no title"};
  		const response = await request(app).post('/api/v1/lists').send(badList);
  		expect(response.status).toBe(422);
  	})
  })

  describe ('PUT /api/v1/lists/', () => {
  	it ('should have a status code of 204', async () => {
  		const listToUpdate = {title: "hello", notes:[{
                "id": 1558629165846,
                "userTask": "go to europe",
                "complete": false
            }]}
  		const response = await request(app).put('/api/v1/lists/1558629197562').send(listToUpdate);
  		expect (response.status).toBe(204);
  	})

  	it ('should have a status code of 422 if title or notes is missing', async () => {
  		const listToUpdate = {title: "hello"}
  		const response = await request(app).put('/api/v1/lists/1558629197562').send(listToUpdate);
  		expect(response.status).toBe(422);
  	})

  	it('should have a status code of 404 if note not found', async () => {
  		const listToUpdate = {title: "hello", notes:[{
                "id": 1558629165946,
                "userTask": "go to europe",
                "complete": false
            }]}
        const response = await request(app).put('/api/v1/lists/155862919dassa2').send(listToUpdate)
        expect(response.status).toBe(404);

  	})
  })

  describe ('DELETE /api/v1/lists/:id', () => {
  	it ('should have a status code of 200 on successful delete', async () => {
  		const response = await request(app).delete('/api/v1/lists/1558629197562')
  		expect(response.status).toBe(200);
  	})

  	it ('should have a status code of 404 if id does not match', async () => {
  		const response = await request(app).delete('/api/v1/lists/15586dsss7562')
  		expect(response.status).toBe(404);
  	})
  })































})