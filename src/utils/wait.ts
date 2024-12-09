export function wait(timeout: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
