import cardStyle from "./ingredient-list.module.css";
import { forwardRef, useMemo, memo } from "react";
import Ingredient from "../ingredient/ingredient";
import { TIngredientList } from "../../services/types/data";
import { Link, useLocation } from "react-router-dom";

const IngredientList = memo(
  forwardRef<HTMLDivElement, TIngredientList>(
    ({ list, typeCard, title }, ref) => {
      const location = useLocation();

      const filteredItems = useMemo(
        () => list.filter((element) => element.type === typeCard),
        [list, typeCard]
      );

      return (
        <div ref={ref}>
          <h2 className="text text_type_main-medium pb-6">{title}</h2>
          <ul className={`pl-4 pb-10 ${cardStyle.card__list}`}>
            {filteredItems.map((item) => (
              <Link
                key={item._id}
                to={{
                  pathname: `/ingredients/${item._id}`,
                  state: { background: location },
                }}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li key={item._id} className={cardStyle.card__listItem}>
                  <Ingredient data={item} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
  )
);

export default IngredientList;
