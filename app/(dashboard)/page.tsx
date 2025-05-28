import { Button } from '@/components/ui/button';
import { ArrowRight, Settings, Users, CreditCard } from 'lucide-react';
import { Terminal } from './terminal';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"> */}
            <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                みんなのおうちで、
                <span className="block text-orange-500">動態保存しようぜ！</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                山田くらうどは、古い計算機を動体保存し、<br />
                それらを仲間内で触れるようにするクラウドサービスです。<br />
                GeForceやRadeon、FPGAボードなど、今では使われなくなった機材を
                もう一度、ログインして触れる場所として維持しています。
              </p>
              {/* <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a
                  href="https://vercel.com/templates/next.js/next-js-saas-starter"
                  target="_blank"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg rounded-full"
                  >
                    Deploy your own
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div> */}
            </div>
            {/* <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"> */}
            <div className="mt-12 relative sm:max-w-md sm:mx-auto lg:mt-0 lg:max-w-lg lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="mt-10 lg:mt-0 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Settings className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  古いアーキテクチャに触れる。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  古いGPU、FPGA、旧型サーバーなど、今では実機が手に入らない構成にログインできます。<br />
                  動作保証はありませんが、触れることに意味があります。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  仲間内限定のクラウド。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  利用は信頼できる仲間に限られます。<br />
                  鍵を登録すれば、指定のマシンにSSHでアクセスできます。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  最低限の維持費だけ。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  利用料金は、機材の維持と電力費を分担するための最低限のものです。<br />
                  Stripeで支払いが可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              古い計算機、残っていませんか？
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              使われていないけれど、まだ動く機材があれば、山田くらうどで生かせるかもしれません。<br />
              GPU、FPGA、旧サーバーなど、対応可能な範囲で設置・接続を行います。
              詳細は、運営までお問い合わせください。
            </p>
          </div>
            {/* <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="https://github.com/nextjs/saas-starter" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg rounded-full"
                >
                  View the code
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
