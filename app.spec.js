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
  		console.log("expected",expected)
  		expect (response.body).toEqual(expected);
  	})
  })































})