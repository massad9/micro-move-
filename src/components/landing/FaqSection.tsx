import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'ما هو مايكرو موف؟',
    answer:
      'مايكرو موف هو منصة ذكية تستخدم الذكاء الاصطناعي لتقديم تنبيهات حركية مخصصة للموظفين أثناء ساعات العمل. الهدف هو مكافحة أضرار الجلوس المطوّل وتحسين صحة وإنتاجية الفريق.',
  },
  {
    question: 'كيف يعمل نظام التنبيهات الذكية؟',
    answer:
      'يحلل الذكاء الاصطناعي جدول الموظف واجتماعاته وأنماط عمله ليقدم تنبيهات في الأوقات المناسبة. التنبيهات تكون واعية بالسياق — لن تقاطعك أثناء اجتماع مهم، بل تنتظر اللحظة المثالية.',
  },
  {
    question: 'هل يمكن تخصيص التمارين والأنشطة؟',
    answer:
      'نعم! يمكن للمسؤولين إضافة وتعديل الأنشطة والتمارين بما يتناسب مع بيئة العمل. كما يتعلم النظام تفضيلات كل موظف مع مرور الوقت ليقدم اقتراحات أكثر ملاءمة.',
  },
  {
    question: 'كيف يعمل نظام النقاط والمكافآت؟',
    answer:
      'يكسب الموظفون نقاطاً عند إتمام التمارين والأنشطة. يمكن استبدال هذه النقاط بمكافآت يحددها المسؤول مثل إجازات إضافية أو قسائم شرائية أو هدايا. النظام يشمل أيضاً لوحة متصدرين وتحديات جماعية.',
  },
  {
    question: 'هل مايكرو موف آمن وخاص؟',
    answer:
      'بالتأكيد. نلتزم بأعلى معايير الأمان والخصوصية. البيانات مشفرة بالكامل ولا نشارك أي معلومات شخصية مع أطراف ثالثة. كل موظف يتحكم في إعدادات خصوصيته.',
  },
  {
    question: 'هل يتكامل مع أنظمتنا الحالية؟',
    answer:
      'في خطة المؤسسات، نوفر تكاملاً مع أنظمة الموارد البشرية الشائعة وتقويمات العمل (Google Calendar، Microsoft Teams) وأدوات التواصل المختلفة.',
  },
];

const FaqItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ question, answer, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={cn(
        "border-b border-border/10 transition-colors duration-500",
        isOpen && "bg-secondary/20"
    )}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      id={`faq-trigger-${index}`}
      className="w-full flex items-center justify-between gap-6 py-8 px-6 text-right group"
    >
      <span className={cn(
          "text-lg font-bold tracking-tight transition-colors duration-500",
          isOpen ? "text-primary" : "text-foreground opacity-80 group-hover:opacity-100"
      )}>{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        <ChevronDown className={cn(
            "w-5 h-5 transition-colors duration-500",
            isOpen ? "text-primary" : "text-muted-foreground opacity-40 group-hover:opacity-100"
        )} />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-trigger-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-8">
            <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-2xl opacity-80">
                {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 w-fit">
            الأسئلة الشائعة
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            كل ما تحتاج <br /> معرفته عن المنصة
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium opacity-80">
            إجابات على أكثر الأسئلة شيوعاً حول مايكرو موف
          </p>
        </motion.div>

        <div className="border-t border-border/10">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
