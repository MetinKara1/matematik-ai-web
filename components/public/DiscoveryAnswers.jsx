import Link from "next/link";
const answers = {
  "tr": [
    {
      "question": "Fotoğraftan matematik sorusunu nasıl çözebilirim?",
      "answer": "MatAI ile matematik sorusunun fotoğrafını veya metnini kullanarak çözüm adımlarını inceleyebilirsin. Fotoğrafta bütün soru, varsa grafik ve seçenekler okunmalı. Önce sistemin soruyu doğru okuduğunu, ardından kurduğu denklemi kontrol et; yapay zekâ açıklaması hata içerebilir.",
      "links": [
        {
          "label": "MatAI soru çözme yaklaşımı",
          "href": "/yapay-zeka-matematik-cozucu"
        },
        {
          "label": "Resmî iOS uygulama sayfası",
          "href": "https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761"
        }
      ]
    },
    {
      "question": "Bir çözümde neden o işlemin yapıldığını anlamadım. Ne yapmalıyım?",
      "answer": "Takıldığın satırı açıkça belirt: hangi değişkenin tanımlandığı, neden eşitlik kurulduğu veya hangi kuralın kullanıldığı gibi. Açıklamayı okuduktan sonra benzer bir soruyu yardım almadan çöz. Yalnız doğru şıkkı görmek yöntemi öğrendiğini göstermez.",
      "links": [
        {
          "label": "Çözüm adımlarını kontrol et",
          "href": "/rehber/tyt-matematik-cikmis-soru-cozumunu-kontrol-etme"
        },
        {
          "label": "Çözümlü konu kütüphanesi",
          "href": "/makaleler"
        }
      ]
    },
    {
      "question": "Uygulama kullanmadan matematik çalışabilir miyim?",
      "answer": "Evet. Bu sitedeki konu anlatımları, özgün çözümlü örnekler ve hesaplayıcılar çalışma için ayrı başlangıç noktalarıdır. Bir hesaplayıcının verdiği sonuçla yetinme; tanım koşullarını ve yöntemini de incele. Web kaynaklarını okumak mobil uygulamayı indirmeyi gerektirmez.",
      "links": [
        {
          "label": "Matematik araçları",
          "href": "/araclar"
        },
        {
          "label": "Konu merkezleri",
          "href": "/konular"
        }
      ]
    },
    {
      "question": "Yapay zekâ yanlış matematik sonucu verirse nasıl fark ederim?",
      "answer": "İlk geçersiz adımı bul, verilen koşulları yeniden oku ve sonucu yerine koyarak kontrol et. Örneğin indirimden önceki fiyatı bulurken indirimli fiyata aynı yüzdeyi eklemek yanlış taban kullanabilir. Önemli bir sonucu bağımsız hesapla veya öğretmeninle doğrula.",
      "links": [
        {
          "label": "Yüzde hesabı ve geri kontrol",
          "href": "/rehber/yuzde-hesaplama-indirim-sonrasi-ilk-fiyat"
        },
        {
          "label": "İçerik ve düzeltme politikası",
          "href": "/icerik-politikasi"
        }
      ]
    }
  ]
};
export default function DiscoveryAnswers({locale="tr"}) {
const rows=answers[locale] || answers[Object.keys(answers)[0]];
const tr=locale==="tr";const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:rows.map(r=>({"@type":"Question",name:r.question,acceptedAnswer:{"@type":"Answer",text:r.answer}}))};
return <section id="questions-and-use-cases" aria-labelledby="discovery-questions-heading"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><h2 id="discovery-questions-heading">{tr?"Hangi sorunda nereden başlamalısın?":"Which question can we help you answer?"}</h2>{rows.map(r=><section key={r.question}><h3>{r.question}</h3><p>{r.answer}</p><ul>{r.links.map(l=><li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></section>)}</section>;
}
