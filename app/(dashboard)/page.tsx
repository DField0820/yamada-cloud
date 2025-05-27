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
            <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-7 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                いい感じのマシン、
                <span className="block text-orange-500">あります。</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                重たい計算を回したくなったとき、<br />
                山田くらうどは、それをちょっと気軽にできる場所です。<br />
                HPCっぽいことをやりたいけれど、大げさな手続きや高額なクラウド利用は避けたい──そんなときにちょうどいい場所を。
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
            <div className="mt-12 relative sm:max-w-md sm:mx-auto lg:mt-0 lg:max-w-lg lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
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
                  重たい計算も、気軽に。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  数値解析やシミュレーション、バッチ処理など、ちょっと本気の計算をしたいときに。<br />
                  ローカルじゃ心細いときの、ちょうどいいクラウド。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  仲間だけで、静かに回す。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  誰でも使えるサービスではありません。<br />
                  信頼できる仲間内で、リソースをゆるく共有。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  ちゃんと使って、ちゃんと払う。
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Stripeによる明快な課金システムで、料金はしっかり発生します。<br />
                  でも、触れることを拒みません。まず使ってみてください。
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
              自分のマシンも、<br className="sm:hidden" />混ぜてみる？
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              「うちにも空いてるGPUあるんだけど...」「計算機あまってる」  
              そんなあなた、山田くらうどに参加しませんか？  
              いまはドキュメント準備中。興味があれば、運営までご相談ください。
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
