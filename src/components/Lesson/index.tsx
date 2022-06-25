import { CheckCircle, Lock } from "phosphor-react"
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  avalibleAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{slug: string}>()

  const isLessonAvailable = isPast(props.avalibleAt)
  const availableDateFormatted = format(props.avalibleAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group relative">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div 
        className={classNames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
          {
            'bg-green-500': isActiveLesson
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("text-sm font-medium flex items-center gap-2", {
              'text-while': isActiveLesson,
              'text-blue-500': !isActiveLesson,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className={classNames("text-sm font-medium flex items-center gap-2", {
              'text-white': isActiveLesson,
              'text-orange-500': !isActiveLesson,
            })}>
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border font-bold", {
            'border-green-300': !isActiveLesson,
            'border-white': isActiveLesson,
          })}>
            {props.type === "live" ? "AO VIVO" : "Aula Prática"}
          </span>
        </header>

        <strong 
          className={classNames("mt-5 block", {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}
        >
          {props.title}
        </strong>
      </div>

      { isActiveLesson && <div className="w-[13.75px] h-[13.75px] bg-green-500 rounded-sm rotate-45 -mx-[6px] -my-16 absolute" />}
    </Link>
  );
}
