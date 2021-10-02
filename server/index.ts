import { Router, listen } from 'worktop'
import faunadb from 'faunadb'

export function customFetch(url: RequestInfo, params: RequestInit | undefined) {
    const signal = params?.signal
    delete params?.signal

    const abortPromise: Promise<Response> = new Promise((resolve) => {
        if (signal) {
            signal.onabort = resolve as any
        }
    })

    return Promise.race([abortPromise, fetch(url, params)])
}

export function getFaunaError(error: any) {
    const { code, description } = error.requestResult.responseContent.errors[0]
    let status

    switch (code) {
        case 'instance not found':
            status = 404
            break
        case 'instance not unique':
            status = 409
            break
        case 'permission denied':
            status = 403
            break
        case 'unauthorized':
        case 'authentication failed':
            status = 401
            break
        default:
            status = 500
    }

    return { code, description, status }
}

declare const FAUNA_SECRET: string

const router = new Router()

const faunaClient = new faunadb.Client({
    secret: FAUNA_SECRET,
    fetch: customFetch
})

const { Create, Collection, Match, Index, Get, Ref, Documents, Paginate, Sum, Delete, Add, Select, Let, Var, Update, Map, Lambda } = faunadb.query

function flattenFauna(d: any) {
    return {
        id: d.ref.value.id,
        ts: d.ts,
        ...d.data
    }
}
``

router.add('GET', '/api/patterns/:id', async (req, res) => {
    try {
        const result = await faunaClient.query(
            Get(Ref(Collection("patterns"), req.params.id))
        )
        
        res.send(200, flattenFauna((result as any)))
    } catch (error) {
        const faunaError = getFaunaError(error)
        res.send(faunaError.status, faunaError)
    }
})

router.add('GET', '/api/patterns', async (request, response) => {
    try {

        const result = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("patterns"))),
                Lambda("id", Get(Var("id")))
            )
        )
        
        response.send(200, (result as any).data.map(flattenFauna))
    } catch (error) {
        const faunaError = getFaunaError(error)
        response.send(faunaError.status, faunaError)
    }
})

router.add('POST', '/api/patterns', async (request, response) => {
    try {
        const { title, slug, explanation } = await request.body() as any

        const result = await faunaClient.query(
            Create(
                Collection('patterns'),
                {
                    data: {
                        title,
                        slug,
                        explanation
                    }
                }
            )
        )

        
        response.send(200, { patternId: (result as any).ref.id })
    } catch (error) {
        const faunaError = getFaunaError(error)
        response.send(faunaError.status, faunaError)
    }
})

listen(router.run)