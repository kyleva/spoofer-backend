import Counter from './counter-model'

export function bootstrap() {
  Counter.findOne({}, (err, result) => {
    if (result == null) {
      const counter = new Counter({
        _id: 'url_count',
        seq: 10000
      }).save()
    }
  })
}
