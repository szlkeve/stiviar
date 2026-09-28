## TODO

How hard: 1 → 4

#### High Prio

- (2) fetch list
- (2) error handling - fetch error, backend error, html response, validation error, ...
- solve mutations
- solve other api actions
- handle data from header

#### Medium Prio

- (2) solve authentication - explain how the api works with different auth providers
- (2) type def - declare type and value model outside of the register function
- (3) add sample react app
- (2) contract test capability

#### Low Prio

- (needs to break up per provider) different BAAS solution integration - rest api, graph api, firebase, supabase

---

---

---

### Documentation

- document: needs strick null checking: "strict": true
- only need to import the library at one place -> loosly coupled to the application - use own the useData hook, so you can swap it any time to a different implementation, not locking you into one ecosystem

#### Only maybe

- set default data
- (2) function based definition - instead of model config, use funciton/entity to bind type and state together

## DONE

- auto test pipeline
- expose query client
- programmatically invalidate - with key
- set base url
- (1) rename package
- (2) publish package
- (2) optimistic update
